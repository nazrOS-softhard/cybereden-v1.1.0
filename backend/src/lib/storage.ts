import { v4 as uuidv4 } from 'uuid';

// ==================== AVATAR UPLOAD ====================
export async function uploadAvatar(
  bucket: R2Bucket,
  file: ArrayBuffer,
  userId: string,
  fileName: string
): Promise<{ key: string; url: string }> {
  const fileExtension = fileName.split('.').pop() || 'jpg';
  const key = `avatars/${userId}/${uuidv4()}.${fileExtension}`;

  await bucket.put(key, file, {
    httpMetadata: {
      contentType: getContentType(fileExtension),
      cacheControl: 'max-age=31536000', // 1 год
    },
    customMetadata: {
      uploadedBy: userId,
      originalName: fileName,
      uploadedAt: new Date().toISOString(),
    },
  });

  // Формируем URL для публичного доступа
  const url = `https://${bucket.name}.r2.cloudflarestorage.com/${key}`;

  return { key, url };
}

// ==================== ASSET UPLOAD ====================
export async function uploadAsset(
  bucket: R2Bucket,
  file: ArrayBuffer,
  userId: string,
  fileName: string
): Promise<{ key: string; url: string; size: number; type: string }> {
  const fileExtension = fileName.split('.').pop() || 'bin';
  const key = `assets/${userId}/${uuidv4()}-${Date.now()}.${fileExtension}`;
  const mimeType = getContentType(fileExtension);

  await bucket.put(key, file, {
    httpMetadata: {
      contentType: mimeType,
      cacheControl: 'max-age=31536000',
    },
    customMetadata: {
      uploadedBy: userId,
      originalName: fileName,
      uploadedAt: new Date().toISOString(),
    },
  });

  const url = `https://${bucket.name}.r2.cloudflarestorage.com/${key}`;

  return {
    key,
    url,
    size: file.byteLength,
    type: getFileType(fileExtension),
  };
}

// ==================== DOWNLOAD ====================
export async function downloadFile(
  bucket: R2Bucket,
  key: string
): Promise<ArrayBuffer | null> {
  const file = await bucket.get(key);

  if (!file) return null;

  return file.arrayBuffer();
}

// ==================== DELETE ====================
export async function deleteFile(bucket: R2Bucket, key: string): Promise<void> {
  await bucket.delete(key);
}

// ==================== LIST FILES ====================
export async function listUserFiles(
  bucket: R2Bucket,
  userId: string,
  prefix: string = 'assets/'
): Promise<Array<{ key: string; size: number; uploaded: Date }>> {
  const fullPrefix = `${prefix}${userId}/`;
  const { objects } = await bucket.list({ prefix: fullPrefix });

  return (
    objects?.map((obj) => ({
      key: obj.key,
      size: obj.size,
      uploaded: obj.uploaded || new Date(),
    })) || []
  );
}

// ==================== GENERATE SIGNED URL ====================
export async function generateSignedUrl(
  bucket: R2Bucket,
  key: string,
  expirationSeconds: number = 3600
): Promise<string> {
  // Для публичного доступа просто возвращаем прямой URL
  // Если нужны подписанные URLs, используйте Cloudflare API
  return `https://${bucket.name}.r2.cloudflarestorage.com/${key}`;
}

// ==================== COPY FILE ====================
export async function copyFile(
  sourceBucket: R2Bucket,
  targetBucket: R2Bucket,
  sourceKey: string,
  targetKey: string
): Promise<void> {
  const file = await sourceBucket.get(sourceKey);

  if (!file) {
    throw new Error('Source file not found');
  }

  const buffer = await file.arrayBuffer();

  await targetBucket.put(targetKey, buffer, {
    httpMetadata: file.httpMetadata,
    customMetadata: file.customMetadata,
  });
}

// ==================== UTILITIES ====================
export function getContentType(fileExtension: string): string {
  const mimeTypes: Record<string, string> = {
    // Images
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    webp: 'image/webp',
    svg: 'image/svg+xml',

    // Documents
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
    json: 'application/json',
    xml: 'application/xml',

    // Archives
    zip: 'application/zip',
    rar: 'application/x-rar-compressed',
    '7z': 'application/x-7z-compressed',
    tar: 'application/x-tar',
    gz: 'application/gzip',

    // Video
    mp4: 'video/mp4',
    webm: 'video/webm',
    avi: 'video/x-msvideo',
    mov: 'video/quicktime',
    mkv: 'video/x-matroska',

    // Audio
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    flac: 'audio/flac',
    m4a: 'audio/mp4',
    aac: 'audio/aac',

    // Archives for NFTs/Digital Assets
    glb: 'model/gltf-binary',
    gltf: 'model/gltf+json',
    obj: 'model/obj',
    fbx: 'model/x-fbx',
  };

  return mimeTypes[fileExtension.toLowerCase()] || 'application/octet-stream';
}

export function getFileType(fileExtension: string): string {
  const extension = fileExtension.toLowerCase();

  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
    return 'image';
  }
  if (['mp4', 'webm', 'avi', 'mov', 'mkv'].includes(extension)) {
    return 'video';
  }
  if (['mp3', 'wav', 'flac', 'm4a', 'aac'].includes(extension)) {
    return 'audio';
  }
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return 'archive';
  }
  if (['pdf', 'doc', 'docx', 'txt', 'json', 'xml'].includes(extension)) {
    return 'document';
  }
  if (['glb', 'gltf', 'obj', 'fbx'].includes(extension)) {
    return 'model';
  }

  return 'file';
}

export function getFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

// ==================== VALIDATION ====================
export function validateFileSize(bytes: number, maxMB: number = 500): boolean {
  return bytes <= maxMB * 1024 * 1024;
}

export function validateFileType(
  fileName: string,
  allowedTypes: string[] = []
): boolean {
  if (allowedTypes.length === 0) return true;

  const extension = fileName.split('.').pop()?.toLowerCase() || '';
  return allowedTypes.includes(extension);
}
