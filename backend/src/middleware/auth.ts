import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Express middleware: читает JWT из заголовка Authorization: Bearer <token>
 * Добавляет req.userId если токен валиден, иначе возвращает 401
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): any {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Отсутствует заголовок Authorization: Bearer <token>',
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };
    (req as any).userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Токен недействителен или истёк',
    });
  }
}
