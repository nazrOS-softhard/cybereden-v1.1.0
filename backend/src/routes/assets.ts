import { Context, AssetsListResponse, Asset, AssetWithUser } from '@types/index';
import { getPublicAssets, getAssetsByUserId, getAssetById } from '@lib/db';
import { HTTPException, createCORSResponse } from '@middleware/auth';

// ==================== GET ALL PUBLIC ASSETS (DATACENTER) ====================
export async function getAssetsHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);
    const search = url.searchParams.get('search') || '';
    const fileType = url.searchParams.get('type');
    const sortBy = url.searchParams.get('sort') || 'recent'; // recent, popular, trending

    if (page < 1) {
      throw new HTTPException(400, 'Page must be greater than 0', 'INVALID_PAGE');
    }

    const offset = (page - 1) * limit;

    // Получаем публичные активы
    let query = `
      SELECT a.*, u.id as user_id, u.display_name, u.avatar_url
      FROM assets a
      JOIN users u ON a.user_id = u.id
      WHERE a.is_public = 1 AND u.is_public = 1
    `;

    const params: unknown[] = [];

    // Фильтрация по типу
    if (fileType) {
      query += ' AND a.file_type = ?${params.length + 1}';
      params.push(fileType);
    }

    // Поиск
    if (search) {
      query += ' AND (a.file_name LIKE ?${params.length + 1} OR u.display_name LIKE ?${params.length + 2})';
      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    // Сортировка
    switch (sortBy) {
      case 'popular':
        query += ' ORDER BY a.downloads DESC';
        break;
      case 'trending':
        query += ' ORDER BY a.created_at DESC'; // В реальности - по recent downloads
        break;
      case 'recent':
      default:
        query += ' ORDER BY a.created_at DESC';
    }

    query += ' LIMIT ?${params.length + 1} OFFSET ?${params.length + 2}';
    params.push(limit);
    params.push(offset);

    // Строим правильный SQL с параметрами
    let preparedQuery = query;
    for (let i = 0; i < params.length; i++) {
      preparedQuery = preparedQuery.replace('?$', '?');
    }

    const assets = await context.env.DB
      .prepare(preparedQuery)
      .bind(...params)
      .all<AssetWithUser>();

    // Получаем общее количество
    let countQuery = `
      SELECT COUNT(*) as total FROM assets a
      JOIN users u ON a.user_id = u.id
      WHERE a.is_public = 1 AND u.is_public = 1
    `;

    const countParams: unknown[] = [];

    if (fileType) {
      countQuery += ' AND a.file_type = ?1';
      countParams.push(fileType);
    }

    if (search) {
      countQuery += ` AND (a.file_name LIKE ?${countParams.length + 1} OR u.display_name LIKE ?${countParams.length + 2})`;
      countParams.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    const countResult = await context.env.DB
      .prepare(countQuery)
      .bind(...countParams)
      .first<{ total: number }>();

    const response: AssetsListResponse = {
      assets: assets || [],
      total: countResult?.total || 0,
      page,
      limit,
    };

    return createCORSResponse(response, 200);
  } catch (error) {
    console.error('Get assets error:', error);

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
        error: 'Failed to get assets',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET ASSETS BY USER (КИБЛУ / ПРОФИЛЬ) ====================
export async function getUserAssetsHandler(context: Context): Promise<Response> {
  try {
    const userId = context.params.userId;
    const page = parseInt(new URL(context.req.url).searchParams.get('page') || '1');
    const limit = Math.min(parseInt(new URL(context.req.url).searchParams.get('limit') || '50'), 100);

    if (!userId) {
      throw new HTTPException(400, 'Missing user ID', 'MISSING_USER_ID');
    }

    if (page < 1) {
      throw new HTTPException(400, 'Page must be greater than 0', 'INVALID_PAGE');
    }

    // Получаем пользователя
    const user = await context.env.DB
      .prepare('SELECT * FROM users WHERE id = ?1')
      .bind(userId)
      .first();

    if (!user) {
      throw new HTTPException(404, 'User not found', 'USER_NOT_FOUND');
    }

    // Если профиль приватный, только сам пользователь может видеть файлы
    if (!user.is_public && (!context.user || context.user.id !== userId)) {
      throw new HTTPException(403, 'This profile is private', 'ACCESS_DENIED');
    }

    const offset = (page - 1) * limit;

    const assets = await context.env.DB
      .prepare(`
        SELECT * FROM assets 
        WHERE user_id = ?1 AND is_public = 1
        ORDER BY created_at DESC
        LIMIT ?2 OFFSET ?3
      `)
      .bind(userId, limit, offset)
      .all<Asset>();

    const countResult = await context.env.DB
      .prepare('SELECT COUNT(*) as total FROM assets WHERE user_id = ?1 AND is_public = 1')
      .bind(userId)
      .first<{ total: number }>();

    const response = {
      user: {
        id: user.id,
        display_name: user.display_name,
        avatar_url: user.avatar_url,
        xp: user.xp,
        level: user.level,
      },
      assets: assets || [],
      total: countResult?.total || 0,
      page,
      limit,
    };

    return createCORSResponse(response, 200);
  } catch (error) {
    console.error('Get user assets error:', error);

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
        error: 'Failed to get user assets',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET MY ASSETS (приватные + публичные) ====================
export async function getMyAssetsHandler(context: Context): Promise<Response> {
  try {
    if (!context.user) {
      throw new HTTPException(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    const page = parseInt(new URL(context.req.url).searchParams.get('page') || '1');
    const limit = Math.min(parseInt(new URL(context.req.url).searchParams.get('limit') || '50'), 100);
    const isPublic = new URL(context.req.url).searchParams.get('public');

    if (page < 1) {
      throw new HTTPException(400, 'Page must be greater than 0', 'INVALID_PAGE');
    }

    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM assets WHERE user_id = ?1';
    const params: unknown[] = [context.user.id];

    if (isPublic !== null) {
      query += ` AND is_public = ?2`;
      params.push(isPublic === 'true');
    }

    query += ' ORDER BY created_at DESC LIMIT ?${last + 1} OFFSET ?${last + 2}';
    params.push(limit);
    params.push(offset);

    const assets = await context.env.DB
      .prepare(query)
      .bind(...params)
      .all<Asset>();

    const countQuery = 'SELECT COUNT(*) as total FROM assets WHERE user_id = ?1' +
      (isPublic !== null ? ` AND is_public = ?2` : '');
    const countParams: unknown[] = [context.user.id];
    if (isPublic !== null) {
      countParams.push(isPublic === 'true');
    }

    const countResult = await context.env.DB
      .prepare(countQuery)
      .bind(...countParams)
      .first<{ total: number }>();

    return createCORSResponse(
      {
        assets: assets || [],
        total: countResult?.total || 0,
        page,
        limit,
      },
      200
    );
  } catch (error) {
    console.error('Get my assets error:', error);

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
        error: 'Failed to get your assets',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== GET SINGLE ASSET ====================
export async function getAssetHandler(context: Context): Promise<Response> {
  try {
    const assetId = context.params.id;

    if (!assetId) {
      throw new HTTPException(400, 'Missing asset ID', 'MISSING_ASSET_ID');
    }

    const asset = await context.env.DB
      .prepare(`
        SELECT a.*, u.id as user_id, u.display_name, u.avatar_url
        FROM assets a
        JOIN users u ON a.user_id = u.id
        WHERE a.id = ?1
      `)
      .bind(assetId)
      .first<AssetWithUser>();

    if (!asset) {
      throw new HTTPException(404, 'Asset not found', 'ASSET_NOT_FOUND');
    }

    // Проверяем права доступа
    if (!asset.is_public && (!context.user || context.user.id !== asset.user_id)) {
      throw new HTTPException(403, 'This asset is not public', 'ACCESS_DENIED');
    }

    return createCORSResponse({ asset }, 200);
  } catch (error) {
    console.error('Get asset error:', error);

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
        error: 'Failed to get asset',
        code: 'FETCH_FAILED',
      },
      500
    );
  }
}

// ==================== UPDATE ASSET VISIBILITY ====================
export async function updateAssetVisibilityHandler(context: Context): Promise<Response> {
  try {
    if (!context.user) {
      throw new HTTPException(401, 'Unauthorized', 'UNAUTHORIZED');
    }

    const assetId = context.params.id;
    const body = await context.req.json() as { is_public: boolean };

    if (!assetId) {
      throw new HTTPException(400, 'Missing asset ID', 'MISSING_ASSET_ID');
    }

    const asset = await context.env.DB
      .prepare('SELECT * FROM assets WHERE id = ?1')
      .bind(assetId)
      .first();

    if (!asset) {
      throw new HTTPException(404, 'Asset not found', 'ASSET_NOT_FOUND');
    }

    if (asset.user_id !== context.user.id) {
      throw new HTTPException(403, 'Forbidden: You do not own this asset', 'FORBIDDEN');
    }

    await context.env.DB
      .prepare('UPDATE assets SET is_public = ?1 WHERE id = ?2')
      .bind(body.is_public, assetId)
      .run();

    return createCORSResponse(
      { message: 'Asset visibility updated' },
      200
    );
  } catch (error) {
    console.error('Update asset visibility error:', error);

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
        error: 'Failed to update asset visibility',
        code: 'UPDATE_FAILED',
      },
      500
    );
  }
}
export default router;



