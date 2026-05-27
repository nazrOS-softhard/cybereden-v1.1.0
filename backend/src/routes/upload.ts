import { Router, Request, Response } from 'express';
import multer from 'multer';
import { supabase } from '../lib/supabaseClient'; // <--- ИСПРАВЛЕНО (было ../server)
import { authMiddleware } from '../middleware/auth';

const router = Router();

// memoryStorage — файлы в buffer, не пишем на диск (Vercel read-only filesystem)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// ══════════════════════════════════════════════
//  АВАТАРКА
// ══════════════════════════════════════════════

// POST /api/upload/avatar
// Headers: Authorization: Bearer <token>
// Body: multipart/form-data, поле: "avatar"
router.post('/avatar', authMiddleware, upload.single('avatar'), async (req: Request, res: Response): Promise<any> => {
  const file   = req.file;
  const userId = (req as any).userId;

  if (!file) {
    return res.status(400).json({ error: 'Файл не прикреплён. Поле multipart: "avatar"' });
  }

  const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowed.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Разрешены только изображения: jpg, png, webp, gif' });
  }

  try {
    const ext      = file.originalname.split('.').pop() || 'jpg';
    const fileName = `${userId}-${Date.now()}.${ext}`;

    // Загружаем в Supabase Storage бакет "avatars"
    const { error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (storageError) throw storageError;

    // Публичный URL
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Сохраняем URL в таблицу users
    const { error: dbError } = await supabase
      .from('users')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    if (dbError) throw dbError;

    return res.status(200).json({ success: true, avatarUrl: publicUrl });
  } catch (err: any) {
    console.error('[Upload Avatar]', err.message);
    return res.status(500).json({ error: err.message || 'Ошибка загрузки аватарки' });
  }
});

// ══════════════════════════════════════════════
//  АКТИВЫ (документы, файлы)
// ══════════════════════════════════════════════

// POST /api/upload/asset
// Headers: Authorization: Bearer <token>
// Body: multipart/form-data, поле: "file"
router.post('/asset', authMiddleware, upload.single('file'), async (req: Request, res: Response): Promise<any> => {
  const file   = req.file;
  const userId = (req as any).userId;

  if (!file) {
    return res.status(400).json({ error: 'Файл не прикреплён. Поле multipart: "file"' });
  }

  try {
    const ext      = file.originalname.split('.').pop() || 'bin';
    const safeName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    const fileKey  = `${userId}/${Date.now()}-${safeName}`;

    // Загружаем в Supabase Storage бакет "assets"
    const { error: storageError } = await supabase.storage
      .from('assets')
      .upload(fileKey, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (storageError) throw storageError;

    // Публичный URL
    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(fileKey);

    // Сохраняем метаданные в таблицу assets
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
        is_public: false,
        downloads: 0,
      })
      .select()
      .single();

    if (dbError) throw dbError;

    return res.status(200).json({ success: true, asset });
  } catch (err: any) {
    console.error('[Upload Asset]', err.message);
    return res.status(500).json({ error: err.message || 'Ошибка загрузки файла' });
  }
});

// GET /api/upload/assets
// Список активов текущего пользователя
router.get('/assets', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId = (req as any).userId;

  const { data: assets, error } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.json({ assets: assets || [] });
});

// DELETE /api/upload/assets/:id
// Удалить актив (из Storage и из БД)
router.delete('/assets/:id', authMiddleware, async (req: Request, res: Response): Promise<any> => {
  const userId  = (req as any).userId;
  const assetId = req.params.id;

  // Проверяем что файл принадлежит пользователю
  const { data: asset, error: findErr } = await supabase
    .from('assets')
    .select('*')
    .eq('id', assetId)
    .eq('user_id', userId)
    .single();

  if (findErr || !asset) {
    return res.status(404).json({ error: 'Актив не найден или нет доступа' });
  }

  // Удаляем из Storage
  await supabase.storage.from('assets').remove([asset.file_key]);

  // Удаляем запись из БД
  const { error: dbErr } = await supabase
    .from('assets')
    .delete()
    .eq('id', assetId);

  if (dbErr) {
    return res.status(500).json({ error: dbErr.message });
  }

  return res.json({ success: true });
});

export default router;
