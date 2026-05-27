import express, { Request, Response } from 'express';
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';

// 1. Инициализируем само приложение Express (создаем переменную app!)
const app = express();

// Разрешаем Express парсить JSON и данные из форм
app.use(express.json());

// Инициализация Supabase (Переменные должны быть добавлены в панели Vercel Backend)
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Используем Service Role для записи без блокировок RLS
);

// Конфигурация multer для сохранения файлов в буфер памяти
const upload = multer({ storage: multer.memoryStorage() });

// 2. Роут проверки здоровья (чтобы /health снова отдавал статус)
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', database: 'connected' });
});

// 3. Эндпоинт загрузки аватарки
app.post('/api/user/avatar', upload.single('avatar'), async (req: Request, res: Response): Promise<any> => {
  try {
    const file = req.file;
    const userId = req.body.userId; // Получаем ID пользователя от фронтенда

    if (!file) {
      return res.status(400).json({ error: 'Файл не прикреплен.' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'ID пользователя обязателен.' });
    }

    // Генерируем уникальное имя файла
    const fileExt = file.originalname.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    // Загружаем файл в бакет 'avatars'
    const { data: storageData, error: storageError } = await supabase.storage
      .from('avatars')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true
      });

    if (storageError) throw storageError;

    // Достаем публичный неизменяемый URL файла
    const { data: { publicUrl } } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    // Сохраняем URL в таблицу пользователей, чтобы он не пропадал
    const { error: dbError } = await supabase
      .from('users') 
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    if (dbError) throw dbError;

    // Отправляем ссылку обратно на фронтенд
    return res.status(200).json({ 
      success: true, 
      avatarUrl: publicUrl 
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Ошибка сервера при загрузке' });
  }
});

// 4. Запуск сервера (нужно для локальной разработки, Vercel использует свои хендлеры, но это не мешает)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

// Экспортируем app для корректной работы Serverless-функций Vercel
export default app;
