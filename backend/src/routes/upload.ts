import { Context, UploadResponse } from '@types/index';
import { uploadAvatar, uploadAsset, validateFileSize, validateFileType, getFileSize } from '@lib/storage';
import { createAsset, updateUser, addXP } from '@lib/db';
import { HTTPException, createCORSResponse, requireAuth, getClientIP } from '@middleware/auth';

// ==================== MAX FILE SIZES ====================
const MAX_AVATAR_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_ASSET_SIZE = 500 * 1024 * 1024; // 500MB
const ALLOWED_AVATAR_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const ALLOWED_ASSET_TYPES = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
  'mp4', 'webm', 'avi', 'mov', 'mkv',
  'mp3', 'wav', 'flac', 'm4a', 'aac',
  'pdf', 'doc', 'docx', 'txt', 'json', 'xml',
  'zip', 'rar', '7z', 'tar', 'gz',
  'glb', 'gltf', 'obj', 'fbx'
];

// ==================== UPLOAD AVATAR ====================
export async function uploadAvatarHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    // Получаем файл из FormData
    const formData = await context.req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      throw new HTTPException(400, 'No file provided', 'MISSING_FILE');
    }

    // Валидация размера
    if (!validateFileSize(file.size, 10)) {
      throw new HTTPException(
        400,
        `Avatar size must be less than 10MB. Current size: ${getFileSize(file.size)}`,
        'FILE_TOO_LARGE'
      );
    }

    // Валидация типа файла
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!validateFileType(file.name, ALLOWED_AVATAR_TYPES)) {
      throw new HTTPException(
        400,
        `Invalid avatar format. Allowed: ${ALLOWED_AVATAR_TYPES.join(', ')}`,
        'INVALID_FILE_TYPE'
      );
    }

    // Загружаем в R2
    const buffer = await file.arrayBuffer();
    const { url } = await uploadAvatar(
      context.env.R2_AVATARS,
      buffer,
      context.user!.id,
      file.name
    );

    // Обновляем профиль пользователя
    const updatedUser = await updateUser(context.env.DB, context.user!.id, {
      avatar_url: url,
    });

    return createCORSResponse(
      {
        message: 'Avatar uploaded successfully',
        user: updatedUser,
        avatar_url: url,
      },
      200
    );
  } catch (error) {
    console.error('Avatar upload error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Avatar upload failed',
        code: 'UPLOAD_FAILED',
      },
      500
    );
  }
}

// ==================== UPLOAD ASSET ====================
export async function uploadAssetHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    // Получаем файл и метаданные
    const formData = await context.req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const isPublic = formData.get('isPublic') !== 'false';

    if (!file) {
      throw new HTTPException(400, 'No file provided', 'MISSING_FILE');
    }

    // Валидация размера
    if (!validateFileSize(file.size, 500)) {
      throw new HTTPException(
        400,
        `Asset size must be less than 500MB. Current size: ${getFileSize(file.size)}`,
        'FILE_TOO_LARGE'
      );
    }

    // Валидация типа файла
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!validateFileType(file.name, ALLOWED_ASSET_TYPES)) {
      throw new HTTPException(
        400,
        `Invalid asset format. Allowed: ${ALLOWED_ASSET_TYPES.join(', ')}`,
        'INVALID_FILE_TYPE'
      );
    }

    // Загружаем в R2
    const buffer = await file.arrayBuffer();
    const { key, url, size, type } = await uploadAsset(
      context.env.R2_ASSETS,
      buffer,
      context.user!.id,
      file.name
    );

    // Сохраняем информацию об активе в БД
    const asset = await createAsset(context.env.DB, {
      user_id: context.user!.id,
      file_name: file.name,
      file_key: key,
      file_size: size,
      file_type: type,
      mime_type: file.type || 'application/octet-stream',
      url,
      is_public: isPublic,
    });

    // Начисляем XP за загрузку файла
    const xpReward = calculateXPReward(size, type);
    const xpResult = await addXP(
      context.env.DB,
      context.user!.id,
      xpReward,
      `Asset uploaded: ${file.name}`,
      asset.id
    );

    const response: UploadResponse = {
      asset,
      xp_awarded: xpResult.xp_awarded,
      new_total_xp: xpResult.new_total_xp,
    };

    return createCORSResponse(response, 201);
  } catch (error) {
    console.error('Asset upload error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        {
          error: error.message,
          code: error.code,
          details: error.details,
        },
        error.status
      );
    }

    return createCORSResponse(
      {
        error: 'Asset upload failed',
        code: 'UPLOAD_FAILED',
      },
      500
    );
  }
}

// ==================== DELETE ASSET ====================
export async function deleteAssetHandler(context: Context): Promise<Response> {
  try {
    requireAuth(context);

    const assetId = context.params.id;

    if (!assetId) {
      throw new HTTPException(400, 'Missing asset ID', 'MISSING_ASSET_ID');
    }

    // Получаем актив
    const asset = await context.env.DB
      .prepare('SELECT * FROM assets WHERE id = ?1')
      .bind(assetId)
      .first();

    if (!asset) {
      throw new HTTPException(404, 'Asset not found', 'ASSET_NOT_FOUND');
    }

    // Проверяем права
    if (asset.user_id !== context.user!.id) {
      throw new HTTPException(403, 'Forbidden: You do not own this asset', 'FORBIDDEN');
    }

    // Удаляем из R2
    await context.env.R2_ASSETS.delete(asset.file_key);

    // Удаляем из БД
    await context.env.DB
      .prepare('DELETE FROM assets WHERE id = ?1')
      .bind(assetId)
      .run();

    return createCORSResponse(
      { message: 'Asset deleted successfully' },
      200
    );
  } catch (error) {
    console.error('Asset delete error:', error);

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
        error: 'Asset deletion failed',
        code: 'DELETE_FAILED',
      },
      500
    );
  }
}

// ==================== DOWNLOAD ASSET ====================
export async function downloadAssetHandler(context: Context): Promise<Response> {
  try {
    const assetId = context.params.id;

    if (!assetId) {
      throw new HTTPException(400, 'Missing asset ID', 'MISSING_ASSET_ID');
    }

    // Получаем актив
    const asset = await context.env.DB
      .prepare('SELECT a.*, u.is_public FROM assets a JOIN users u ON a.user_id = u.id WHERE a.id = ?1')
      .bind(assetId)
      .first<any>();

    if (!asset) {
      throw new HTTPException(404, 'Asset not found', 'ASSET_NOT_FOUND');
    }

    // Проверяем публичность
    if (!asset.is_public || !asset.is_public) {
      if (!context.user || context.user.id !== asset.user_id) {
        throw new HTTPException(403, 'This asset is not public', 'ACCESS_DENIED');
      }
    }

    // Скачиваем файл из R2
    const file = await context.env.R2_ASSETS.get(asset.file_key);

    if (!file) {
      throw new HTTPException(404, 'File not found in storage', 'FILE_NOT_FOUND');
    }

    // Отслеживаем скачивание
    const ip = getClientIP(context.req);
    await context.env.DB
      .prepare(
        `INSERT INTO downloads (id, asset_id, user_id, ip_address, user_agent, created_at)
         VALUES (?1, ?2, ?3, ?4, ?5, datetime('now'))`
      )
      .bind(
        crypto.getRandomValues(new Uint8Array(16)).toString(),
        assetId,
        context.user?.id || null,
        ip,
        context.req.headers.get('user-agent') || 'unknown'
      )
      .run();

    // Увеличиваем счетчик скачиваний
    await context.env.DB
      .prepare('UPDATE assets SET downloads = downloads + 1 WHERE id = ?1')
      .bind(assetId)
      .run();

    const response = new Response(file.body, {
      headers: {
        'Content-Type': file.httpMetadata?.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${asset.file_name}"`,
        'Cache-Control': 'no-cache',
      },
    });

    return response;
  } catch (error) {
    console.error('Asset download error:', error);

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
        error: 'Download failed',
        code: 'DOWNLOAD_FAILED',
      },
      500
    );
  }
}

// ==================== HELPERS ====================
function calculateXPReward(fileSize: number, fileType: string): number {
  const sizeMB = fileSize / (1024 * 1024);

  // Базовый XP за размер файла
  let baseXP = Math.floor(sizeMB * 10);

  // Бонус за тип файла
  let typeBonus = 0;
  if (['video', 'model'].includes(fileType)) {
    typeBonus = 100;
  } else if (['audio', 'document'].includes(fileType)) {
    typeBonus = 50;
  } else if (['image'].includes(fileType)) {
    typeBonus = 25;
  }

  const totalXP = Math.min(baseXP + typeBonus, 1000); // Макс 1000 XP за загрузку

  return Math.max(totalXP, 10); // Мин 10 XP
}

export default router;
