import { Router, Request, Response } from 'express';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Private bucket name в Supabase Storage
const STAGES_BUCKET = 'stage-files';

// ─── GET /api/stages/file — получить подписанный URL для файла стадии ─────────
// Проверяет что стадия разблокирована → генерирует временный URL (1 час)
router.get('/file', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId   = (req as any).userId;
  const { item_id, stage_id, file_name } = req.query as Record<string, string>;

  if (!item_id || !stage_id || !file_name) {
    return res.status(400).json({ error: 'item_id, stage_id, file_name required' });
  }

  // Проверяем что стадия разблокирована
  const { data: unlocked } = await supabase
    .from('unlocked_stages')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', item_id)
    .eq('stage_id', Number(stage_id))
    .single();

  if (!unlocked) {
    return res.status(403).json({ error: 'Стадия не разблокирована' });
  }

  // Путь файла в bucket: item_id/stage_id/file_name
  const filePath = `${item_id}/stage_${stage_id}/${file_name}`;

  // Генерируем подписанный URL на 1 час
  const { data, error } = await supabase.storage
    .from(STAGES_BUCKET)
    .createSignedUrl(filePath, 3600);

  if (error || !data?.signedUrl) {
    // Файл ещё не загружен — возвращаем 404 с понятным сообщением
    return res.status(404).json({
      error:   'Файл пока недоступен — команда nazrOS готовит контент',
      pending: true,
    });
  }

  return res.json({ url: data.signedUrl, expires_in: 3600 });
});

// ─── GET /api/stages/list — список файлов стадии для разблокированного юзера ──
router.get('/list', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { item_id, stage_id } = req.query as Record<string, string>;

  if (!item_id || !stage_id) {
    return res.status(400).json({ error: 'item_id, stage_id required' });
  }

  // Проверяем разблокировку
  const { data: unlocked } = await supabase
    .from('unlocked_stages')
    .select('id')
    .eq('user_id', userId)
    .eq('item_id', item_id)
    .eq('stage_id', Number(stage_id))
    .single();

  if (!unlocked) {
    return res.status(403).json({ error: 'Стадия не разблокирована' });
  }

  // Список файлов в bucket
  const { data: files, error } = await supabase.storage
    .from(STAGES_BUCKET)
    .list(`${item_id}/stage_${stage_id}`);

  if (error) return res.status(500).json({ error: error.message });

  // Генерируем подписанные URL для всех файлов
  const filesWithUrls = await Promise.all(
    (files || []).filter(f => f.name !== '.emptyFolderPlaceholder').map(async (f) => {
      const { data: signed } = await supabase.storage
        .from(STAGES_BUCKET)
        .createSignedUrl(`${item_id}/stage_${stage_id}/${f.name}`, 3600);
      return {
        name:       f.name,
        size:       f.metadata?.size ?? 0,
        url:        signed?.signedUrl ?? null,
        updated_at: f.updated_at,
      };
    })
  );

  return res.json({ files: filesWithUrls });
});

// ─── POST /api/stages/upload — загрузить файл в стадию (только для admin) ─────
// Используется командой nazrOS для наполнения bucket файлами
router.post('/upload', async (req: Request, res: Response): Promise<any> => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Для загрузки используйте Supabase Dashboard или supabase CLI:
  // supabase storage cp ./local-file.pdf ss://stage-files/clon/stage_1/file.pdf
  return res.json({
    message: 'Для загрузки файлов используйте Supabase Dashboard → Storage → stage-files',
    path_format: '{item_id}/stage_{stage_id}/{file_name}',
    example: 'clon/stage_1/cloN_Architecture_v1.pdf',
  });
});

export default router;
