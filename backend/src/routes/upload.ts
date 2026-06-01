import { Router, Request, Response } from 'express';
import multer from 'multer';
import { supabase } from '../lib/supabaseClient';
import { authMiddleware } from '../middleware/auth';

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 },
});

// ── ПХ за тип файла (из ТЗ) ───────────────────────────────────────────────────
function detectXp(fileName: string, mimeType: string): { category: string; xp: number } {
  const ext  = fileName.split('.').pop()?.toLowerCase() || '';
  const mime = mimeType.toLowerCase();

  if (mime.startsWith('image/') || ['svg', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'concept'].includes(ext))
    return { category: 'Изображение / концепт', xp: 3 };

  if (mime.startsWith('video/') || ['mp4', 'mov', 'avi', 'mkv', 'webm'].includes(ext))
    return { category: 'Медиа модуль', xp: 5 };

  if (mime.startsWith('audio/') || ['mp3', 'wav', 'ogg', 'flac'].includes(ext))
    return { category: 'Медиа модуль', xp: 5 };

  if (['stream', 'obs', 'clbr', 'rtsp'].includes(ext))
    return { category: 'Стрим-файл', xp: 6 };

  if (['dll', 'so', 'sys', 'exe', 'bin', 'dat', 'pak', 'ts', 'tsx', 'js', 'py', 'sh'].includes(ext))
    return { category: 'Системный модуль', xp: 12 };

  if (['json', 'yaml', 'yml', 'xml', 'toml', 'proto', 'pdf', 'doc', 'docx', 'md'].includes(ext))
    return { category: 'Цифровой протокол', xp: 15 };

  if (['obj', 'fbx', 'blend', 'stl', 'gltf', 'glb', '3ds'].includes(ext))
    return { category: 'Объёмная модель', xp: 18 };

  if (['unity', 'uproject', 'scene', 'prefab', 'unitypackage'].includes(ext))
    return { category: 'Игровая сцена', xp: 24 };

  if (['umap', 'uasset', 'world', 'level', 'map'].includes(ext))
    return { category: 'Пространство / уровень', xp: 30 };

  if (['onnx', 'pt', 'h5', 'pkl', 'bot'].includes(ext))
    return { category: 'ИИ-бот', xp: 35 };

  if (['prproj', 'aep', 'drp'].includes(ext))
    return { category: 'Кинематографический проект', xp: 40 };

  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext))
    return { category: 'Полноценный toolkit', xp: 55 };

  return { category: 'Цифровая сущность', xp: 3 };
}

// ── Начислить ПХ ──────────────────────────────────────────────────────────────
async function awardXp(userId: string, amount: number, reason: string, assetId?: string) {
  if (amount <= 0) return;
  await supabase.from('xp_logs').insert({ user_id: userId, amount, reason, asset_id: assetId || null });
  const { data: u } = await supabase.from('users').select('xp, level').eq('id', userId).single();
  if (!u) return;
  const newXp    = (u.xp || 0) + amount;
  const newLevel = Math.floor(Math.sqrt(newXp / 100)) + 1;
  await supabase.from('users').update({ xp: newXp, level: newLevel }).eq('id', userId);
}

// ── POST /api/upload/avatar ───────────────────────────────────────────────────
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req: Request, res: Response): Promise<any> => {
  const file   = req.file;
  const userId = (req as any).userId;

  if (!file) return res.status(400).json({ error: 'Поле "avatar" отсутствует' });

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.mimetype))
    return res.status(400).json({ error: 'Разрешены: jpg, png, webp, gif' });

  try {
    const ext      = file.originalname.split('.').pop() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${ext}`;

    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file.buffer, { contentType: file.mimetype, upsert: true });

    if (storageError) throw storageError;

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from('users').update({ avatar_url: publicUrl }).eq('id', userId);

    if (dbError) throw dbError;

    return res.status(200).json({ success: true, avatarUrl: publicUrl });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// ── POST /api/upload/asset ────────────────────────────────────────────────────
router.post('/asset', authMiddleware, upload.single('file'), async (req: Request, res: Response): Promise<any> => {
  const file   = req.file;
  const userId = (req as any).userId;

  if (!file) return res.status(400).json({ error: 'Поле "file" отсутствует' });

  try {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._\-а-яёА-ЯЁ ]/g, '_');
    const fileKey  = `${userId}/${Date.now()}-${safeName}`;
    const ext      = file.originalname.split('.').pop() || 'bin';

    const { error: storageError } = await supabase.storage
      .from('assets')
      .upload(fileKey, file.buffer, { contentType: file.mimetype, upsert: false });

    if (storageError) throw storageError;

    const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(fileKey);

    // Определяем категорию и ПХ
    const { category, xp } = detectXp(file.originalname, file.mimetype);

    const { data: asset, error: dbError } = await supabase
      .from('assets')
      .insert({
        user_id:   userId,
        file_name: file.originalname,
        file_key:  fileKey,
        file_size: file.size,
        file_type: ext,
        mime_type: file.mimetype,
        url:       publicUrl,
        is_public: true,
        downloads: 0,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    // ── Начисляем ПХ за загрузку файла ──────────────────────────────────────
    await awardXp(
      userId,
      xp,
      `Загрузка файла "${file.originalname}" (${category})`,
      asset.id,
    );

    // Возвращаем asset + начисленные ПХ
    return res.status(200).json({
      success: true,
      asset: { ...asset, category, xp_awarded: xp },
      xp_awarded: xp,
      category,
    });

  } catch (err: any) {
    console.error('[Upload Asset]', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── GET /api/upload/assets ────────────────────────────────────────────────────
router.get('/assets', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;
  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ assets: assets || [] });
});

// ── DELETE /api/upload/assets/:id ─────────────────────────────────────────────
router.delete('/assets/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId  = (req as any).userId;
  const assetId = req.params.id;

  const { data: asset, error: findErr } = await supabase
    .from('assets').select('*').eq('id', assetId).eq('user_id', userId).single();

  if (findErr || !asset) return res.status(404).json({ error: 'Актив не найден' });

  await supabase.storage.from('assets').remove([asset.file_key]);

  const { error: dbErr } = await supabase.from('assets').delete().eq('id', assetId);
  if (dbErr) return res.status(500).json({ error: dbErr.message });

  return res.json({ success: true });
});

export default router;
