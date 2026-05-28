import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(req: Request, res: Response, next: NextFunction): any {
  const authHeader = req.headers.authorization;

  // Проверка заголовка
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Отсутствует или неверный токен' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // ВАЖНО: убедись, что process.env.JWT_SECRET в Vercel совпадает с тем, 
    // чем ты подписывал токен при логине
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    (req as any).userId = decoded.sub;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Невалидный токен' });
  }
}
