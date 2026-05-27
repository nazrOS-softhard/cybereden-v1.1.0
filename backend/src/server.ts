import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

import authRouter   from './routes/auth';
import uploadRouter from './routes/upload';
import profileRouter from './routes/profile';

dotenv.config();

// 1. Безопасное извлечение переменных окружения
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: В настройках Vercel не заданы SUPABASE_URL или SUPABASE_SERVICE_ROLE_KEY!');
}

// Экспортируем supabase, чтобы файлы из папки routes могли его импортировать
export const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// 2. Настройка CORS (разрешаем фронтенду слать запросы)
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// 3. Эндпоинт проверки работоспособности бэкенда
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'healthy', 
    database: supabaseUrl ? 'connected' : 'missing_credentials' 
  });
});

// 4. Подключение роутов приложения
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/profile', profileRouter);

// 5. Глобальный перехватчик ошибок (чтобы сервер не падал намертво при сбоях)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('💥 Произошла ошибка внутри Express:', err.message || err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// 6. Условие для локального запуска (на Vercel этот блок автоматически игнорируется)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Сервер успешно запущен локально на порту ${PORT}`);
  });
}

// Критически важно для сборщика @vercel/node
export default app;
