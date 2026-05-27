import { Context } from '../types/index';
import { addXP, getXPLogs, getUserById } from '../lib/db';
import { HTTPException, createCORSResponse, requireAuth } from '../middleware/auth';

// ==================== ADD XP ====================
export async function addXPHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    const body = await context.req.json() as {
      amount: number;
      reason: string;
      asset_id?: string;
    };

    // Валидация
    if (typeof body.amount !== 'number' || body.amount <= 0 || body.amount > 10000) {
      throw new HTTPException(400, 'Invalid XP amount', 'INVALID_AMOUNT');
    }

    if (!body.reason || body.reason.length > 200) {
      throw new HTTPException(400, 'Invalid reason', 'INVALID_REASON');
    }

    // Добавляем XP
    const result = await addXP(
      context.env.DB,
      context.user!.id,
      body.amount,
      body.reason,
      body.asset_id
    );

    // Получаем обновленного пользователя
    const user = await getUserById(context.env.DB, context.user!.id);

    return createCORSResponse(
      {
        message: 'XP added successfully',
        xp_awarded: result.xp_awarded,
        new_total_xp: result.new_total_xp,
        user: {
          id: user!.id,
          xp: user!.xp,
          level: user!.level,
        },
      },
      200
    );
  } catch (error) {
    console.error('Add XP error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Failed to add XP',
        code: 'XP_FAILED',
      },
      500
    );
  }
}

// ==================== GET XP LOGS ====================
export async function getXPLogsHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    const url = new URL(context.req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);
    const userId = context.params.userId || context.user!.id;

    // Проверяем доступ
    if (userId !== context.user!.id && context.user!.id !== 'admin') {
      throw new HTTPException(403, 'You can only view your own XP logs', 'FORBIDDEN');
    }

    const logs = await getXPLogs(context.env.DB, userId, limit);

    return createCORSResponse(
      {
        logs,
        count: logs.length,
        limit,
      },
      200
    );
  } catch (error) {
    console.error('Get XP logs error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Failed to get XP logs',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET XP LEADERBOARD ====================
export async function getXPLeaderboardHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 500);
    const period = url.searchParams.get('period') || 'all'; // all, week, month

    let whereClause = 'WHERE u.is_public = 1';

    if (period === 'week') {
      whereClause += " AND x.created_at >= datetime('now', '-7 days')";
    } else if (period === 'month') {
      whereClause += " AND x.created_at >= datetime('now', '-30 days')";
    }

    // Получаем таблицу лидеров
    const leaderboard = await context.env.DB
      .prepare(`
        SELECT 
          u.id,
          u.display_name,
          u.avatar_url,
          u.level,
          u.xp,
          COUNT(DISTINCT a.id) as asset_count,
          COALESCE(SUM(x.amount), 0) as period_xp
        FROM users u
        LEFT JOIN xp_logs x ON u.id = x.user_id
        LEFT JOIN assets a ON u.id = a.user_id AND a.is_public = 1
        ${whereClause}
        GROUP BY u.id
        ORDER BY 
          CASE 
            WHEN ?1 = 'all' THEN u.xp 
            ELSE COALESCE(SUM(x.amount), 0)
          END DESC
        LIMIT ?2
      `)
      .bind(period, limit)
      .all<any>();

    return createCORSResponse(
      {
        period,
        limit,
        leaderboard: leaderboard || [],
      },
      200
    );
  } catch (error) {
    console.error('Get XP leaderboard error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Failed to get leaderboard',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET USER LEVEL ====================
export async function getUserLevelHandler(context: Context): Promise<Response> {
  try {
    const userId = context.params.userId;

    if (!userId) {
      throw new HTTPException(400, 'Missing user ID', 'MISSING_USER_ID');
    }

    const user = await getUserById(context.env.DB, userId);

    if (!user) {
      throw new HTTPException(404, 'User not found', 'USER_NOT_FOUND');
    }

    // Вычисляем уровень на основе XP
    const level = calculateLevel(user.xp);
    const nextLevelXP = getXPForLevel(level + 1);
    const currentLevelXP = getXPForLevel(level);
    const progressPercent = Math.floor(((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100);

    return createCORSResponse(
      {
        user: {
          id: user.id,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
        },
        level: {
          current: level,
          xp_total: user.xp,
          xp_for_current_level: currentLevelXP,
          xp_for_next_level: nextLevelXP,
          xp_until_next: Math.max(0, nextLevelXP - user.xp),
          progress_percent: progressPercent,
        },
      },
      200
    );
  } catch (error) {
    console.error('Get user level error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Failed to get user level',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET STATS ====================
export async function getStatsHandler(context: Context): Promise<Response> {
  try {
    // Общая статистика платформы
    const stats = await context.env.DB
      .prepare(`
        SELECT 
          COUNT(DISTINCT u.id) as total_users,
          COUNT(DISTINCT a.id) as total_assets,
          SUM(u.xp) as total_xp_distributed,
          SUM(a.downloads) as total_downloads,
          COUNT(DISTINCT d.id) as total_download_events
        FROM users u
        LEFT JOIN assets a ON u.id = a.user_id
        LEFT JOIN downloads d ON a.id = d.asset_id
      `)
      .first<any>();

    // Активные пользователи за последние 7 дней
    const activeUsers = await context.env.DB
      .prepare(`
        SELECT COUNT(DISTINCT user_id) as count
        FROM sessions
        WHERE created_at >= datetime('now', '-7 days')
      `)
      .first<any>();

    // Топ файлы
    const topAssets = await context.env.DB
      .prepare(`
        SELECT id, file_name, downloads
        FROM assets
        WHERE is_public = 1
        ORDER BY downloads DESC
        LIMIT 10
      `)
      .all<any>();

    return createCORSResponse(
      {
        platform: {
          total_users: stats?.total_users || 0,
          total_assets: stats?.total_assets || 0,
          total_xp_distributed: stats?.total_xp_distributed || 0,
          total_downloads: stats?.total_downloads || 0,
          total_download_events: stats?.total_download_events || 0,
        },
        activity: {
          active_users_7d: activeUsers?.count || 0,
        },
        top_assets: topAssets || [],
      },
      200
    );
  } catch (error) {
    console.error('Get stats error:', error);

    return createCORSResponse(
      {
        error: 'Failed to get stats',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== HELPERS ====================
function calculateLevel(xp: number): number {
  // Простая формула: уровень = floor(sqrt(xp / 100))
  // Или более сложная: каждый уровень требует всё больше XP
  let level = 1;
  let requiredXP = 100;
  let totalXP = 0;

  while (totalXP + requiredXP <= xp && level < 100) {
    totalXP += requiredXP;
    level++;
    requiredXP = Math.floor(100 * Math.pow(1.1, level));
  }

  return level;
}

function getXPForLevel(level: number): number {
  // Возвращает общее количество XP, необходимое для достижения уровня
  let totalXP = 0;
  let requiredXP = 100;

  for (let i = 1; i < level; i++) {
    totalXP += requiredXP;
    requiredXP = Math.floor(100 * Math.pow(1.1, i));
  }

  return totalXP;
}

export default router;
