import { Context } from '@types/index';
import { getUserById, getUserProfile, getTopUsers, updateUser, getXPLogs } from '@lib/db';
import { HTTPException, createCORSResponse, requireAuth } from '@middleware/auth';

// ==================== GET PROFILE ====================
export async function getProfileHandler(context: Context): Promise<Response> {
  try {
    const userId = context.params.userId || (context.user ? context.user.id : null);

    if (!userId) {
      throw new HTTPException(401, 'Unauthorized or missing user ID', 'UNAUTHORIZED');
    }

    const user = await getUserById(context.env.DB, userId);

    if (!user) {
      throw new HTTPException(404, 'User not found', 'USER_NOT_FOUND');
    }

    // Если профиль приватный, только сам пользователь может видеть
    if (!user.is_public && (!context.user || context.user.id !== userId)) {
      // Возвращаем минимум информации
      return createCORSResponse(
        {
          user: {
            id: user.id,
            display_name: user.display_name,
            avatar_url: user.avatar_url,
            level: user.level,
            is_public: false,
          },
          message: 'This profile is private',
        },
        200
      );
    }

    // Получаем расширенный профиль с статистикой
    const profile = await getUserProfile(context.env.DB, userId);

    // Получаем историю XP (последние 10)
    const xpLogs = await getXPLogs(context.env.DB, userId, 10);

    return createCORSResponse(
      {
        user: profile,
        xp_logs: xpLogs,
      },
      200
    );
  } catch (error) {
    console.error('Get profile error:', error);

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
        error: 'Failed to get profile',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== UPDATE PROFILE ====================
export async function updateProfileHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    const body = await context.req.json() as {
      display_name?: string;
      bio?: string;
      is_public?: boolean;
    };

    // Валидация
    if (body.display_name && body.display_name.length > 100) {
      throw new HTTPException(400, 'Display name too long', 'INVALID_INPUT');
    }

    if (body.bio && body.bio.length > 500) {
      throw new HTTPException(400, 'Bio too long', 'INVALID_INPUT');
    }

    const updates: Record<string, unknown> = {};

    if (body.display_name) updates.display_name = body.display_name;
    if (body.bio !== undefined) updates.bio = body.bio;
    if (body.is_public !== undefined) updates.is_public = body.is_public;

    const updatedUser = await updateUser(context.env.DB, context.user!.id, updates);

    return createCORSResponse(
      {
        message: 'Profile updated successfully',
        user: updatedUser,
      },
      200
    );
  } catch (error) {
    console.error('Update profile error:', error);

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
        error: 'Failed to update profile',
        code: 'UPDATE_FAILED',
      },
      500
    );
  }
}

// ==================== GET LEADERBOARD ====================
export async function getLeaderboardHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '100'), 500);
    const type = url.searchParams.get('type') || 'xp'; // xp, downloads, assets

    let query = '';
    let orderBy = '';

    switch (type) {
      case 'downloads':
        query = `
          SELECT u.*, COUNT(d.id) as stat_value
          FROM users u
          LEFT JOIN assets a ON u.id = a.user_id
          LEFT JOIN downloads d ON a.id = d.asset_id
          WHERE u.is_public = 1
          GROUP BY u.id
          ORDER BY stat_value DESC
          LIMIT ?1
        `;
        break;

      case 'assets':
        query = `
          SELECT u.*, COUNT(a.id) as stat_value
          FROM users u
          LEFT JOIN assets a ON u.id = a.user_id
          WHERE u.is_public = 1
          GROUP BY u.id
          ORDER BY stat_value DESC
          LIMIT ?1
        `;
        break;

      case 'xp':
      default:
        query = `
          SELECT *, xp as stat_value
          FROM users
          WHERE is_public = 1
          ORDER BY xp DESC
          LIMIT ?1
        `;
    }

    const users = await context.env.DB
      .prepare(query)
      .bind(limit)
      .all();

    return createCORSResponse(
      {
        type,
        users: users || [],
        limit,
      },
      200
    );
  } catch (error) {
    console.error('Get leaderboard error:', error);

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

// ==================== SEARCH USERS ====================
export async function searchUsersHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const query = url.searchParams.get('q') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '20'), 100);

    if (query.length < 2) {
      throw new HTTPException(400, 'Search query must be at least 2 characters', 'INVALID_QUERY');
    }

    const users = await context.env.DB
      .prepare(`
        SELECT id, display_name, avatar_url, xp, level
        FROM users
        WHERE is_public = 1 
        AND (display_name LIKE ?1 OR github_username LIKE ?1 OR twitch_username LIKE ?1)
        ORDER BY xp DESC
        LIMIT ?2
      `)
      .bind(`%${query}%`, limit)
      .all();

    return createCORSResponse(
      {
        query,
        users: users || [],
        count: users?.length || 0,
      },
      200
    );
  } catch (error) {
    console.error('Search users error:', error);

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
        error: 'Failed to search users',
        code: 'SEARCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET USER STATS ====================
export async function getUserStatsHandler(context: Context): Promise<Response> {
  try {
    const userId = context.params.userId;

    if (!userId) {
      throw new HTTPException(400, 'Missing user ID', 'MISSING_USER_ID');
    }

    const user = await getUserById(context.env.DB, userId);

    if (!user) {
      throw new HTTPException(404, 'User not found', 'USER_NOT_FOUND');
    }

    if (!user.is_public && (!context.user || context.user.id !== userId)) {
      throw new HTTPException(403, 'This profile is private', 'ACCESS_DENIED');
    }

    // Получаем статистику
    const stats = await context.env.DB
      .prepare(`
        SELECT 
          COUNT(DISTINCT a.id) as asset_count,
          COALESCE(SUM(a.downloads), 0) as total_downloads,
          COALESCE(SUM(a.file_size), 0) as total_storage_used,
          COUNT(DISTINCT d.id) as unique_downloaders
        FROM users u
        LEFT JOIN assets a ON u.id = a.user_id AND a.is_public = 1
        LEFT JOIN downloads d ON a.id = d.asset_id
        WHERE u.id = ?1
      `)
      .bind(userId)
      .first<any>();

    return createCORSResponse(
      {
        user: {
          id: user.id,
          display_name: user.display_name,
          avatar_url: user.avatar_url,
          xp: user.xp,
          level: user.level,
        },
        stats: {
          asset_count: stats?.asset_count || 0,
          total_downloads: stats?.total_downloads || 0,
          total_storage_used: stats?.total_storage_used || 0,
          unique_downloaders: stats?.unique_downloaders || 0,
        },
      },
      200
    );
  } catch (error) {
    console.error('Get user stats error:', error);

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
        error: 'Failed to get user stats',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET MY PROFILE ====================
export async function getMyProfileHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    const profile = await getUserProfile(context.env.DB, context.user!.id);

    if (!profile) {
      throw new HTTPException(404, 'User not found', 'USER_NOT_FOUND');
    }

    const xpLogs = await getXPLogs(context.env.DB, context.user!.id, 20);

    return createCORSResponse(
      {
        user: profile,
        xp_logs: xpLogs,
      },
      200
    );
  } catch (error) {
    console.error('Get my profile error:', error);

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
        error: 'Failed to get profile',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}


export default router;
