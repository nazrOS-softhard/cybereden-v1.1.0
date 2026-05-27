import { Context, User } from '../types/index.js';
import { verifyJWT, extractBearerToken } from '../lib/auth.js';
import { getUserById } from '../lib/db.js';

// ==================== AUTH MIDDLEWARE ====================
export async function authMiddleware(context: Context): Promise<void> {
  const token = extractBearerToken(context.req.headers.get('authorization'));

  if (!token) {
    context.user = undefined;
    return;
  }

  try {
    const decoded = verifyJWT(token, context.env.JWT_SECRET);

    if (!decoded) {
      context.user = undefined;
      return;
    }

    const user = await getUserById(context.env.DB, decoded.sub);

    if (!user) {
      context.user = undefined;
      return;
    }

    // Обновляем время последнего входа
    await context.env.DB
      .prepare('UPDATE users SET last_login = datetime("now") WHERE id = ?1')
      .bind(user.id)
      .run();

    context.user = user;
  } catch (error) {
    context.user = undefined;
  }
}

// ==================== REQUIRE AUTH ====================
export function requireAuth(context: Context): void {
  if (!context.user) {
    throw new HTTPException(401, 'Unauthorized: No valid token provided');
  }
}

// ==================== ADMIN CHECK ====================
export function requireAdmin(context: Context): void {
  if (!context.user) {
    throw new HTTPException(401, 'Unauthorized');
  }

  // Можно добавить проверку прав администратора из БД
}

// ==================== CORS MIDDLEWARE ====================
export function corsMiddleware(context: Context): void {
  const origin = context.req.headers.get('origin') || '';
  const allowedOrigins = context.env.CORS_ORIGINS.split(',').map(o => o.trim());
  
  if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
    // CORS будет добавлен в response
  }
}

// ==================== RESPONSE WITH CORS ====================
export function createCORSResponse(
  body: unknown,
  status: number = 200,
  corsOrigin?: string
): Response {
  const response = new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (corsOrigin) {
    response.headers.set('Access-Control-Allow-Origin', corsOrigin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400');
  }

  return response;
}

// ==================== HTTP EXCEPTION ====================
export class HTTPException extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'HTTPException';
  }
}

// ==================== ERROR HANDLER ====================
export function handleError(error: unknown): Response {
  console.error('Error:', error);

  if (error instanceof HTTPException) {
    return new Response(
      JSON.stringify({
        error: error.message,
        code: error.code,
        details: error.details,
      }),
      {
        status: error.status,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  if (error instanceof SyntaxError) {
    return new Response(
      JSON.stringify({
        error: 'Invalid JSON in request body',
        code: 'INVALID_JSON',
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      message: error instanceof Error ? error.message : 'Unknown error',
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

// ==================== VALIDATE REQUEST BODY ====================
export async function validateRequestBody<T>(
  req: Request,
  schema: Record<string, { required?: boolean; type?: string }>
): Promise<T> {
  let body: any;

  try {
    body = await req.json();
  } catch {
    throw new HTTPException(400, 'Invalid JSON in request body', 'INVALID_JSON');
  }

  if (!body || typeof body !== 'object') {
    throw new HTTPException(400, 'Request body must be an object', 'INVALID_BODY');
  }

  // Валидация схемы
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !(field in body)) {
      throw new HTTPException(400, `Missing required field: ${field}`, 'MISSING_FIELD', {
        field,
      });
    }

    if (field in body && rules.type) {
      const valueType = typeof body[field];
      if (valueType !== rules.type) {
        throw new HTTPException(400, `Field ${field} must be of type ${rules.type}`, 'INVALID_TYPE', {
          field,
          expected: rules.type,
          received: valueType,
        });
      }
    }
  }

  return body as T;
}

// ==================== RATE LIMITING ====================
export async function rateLimit(
  kv: KVNamespace,
  key: string,
  limit: number = 10,
  window: number = 60 // seconds
): Promise<boolean> {
  const count = await kv.get(key);
  const currentCount = count ? parseInt(count) : 0;

  if (currentCount >= limit) {
    return false;
  }

  await kv.put(key, String(currentCount + 1), { expirationTtl: window });
  return true;
}

// ==================== GET CLIENT IP ====================
export function getClientIP(req: Request): string {
  return (
    req.headers.get('cf-connecting-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}
