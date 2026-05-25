
/**
 * FILE TYPES
 * Типы для работы с файлами и DataCenter
 */

export enum FileType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  ARCHIVE = 'archive',
  OTHER = 'other',
}

export enum FileStatus {
  UPLOADING = 'uploading',
  PROCESSING = 'processing',
  READY = 'ready',
  DELETED = 'deleted',
  ERROR = 'error',
}

export interface FileMetadata {
  id: string;
  userId: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  type: FileType;
  status: FileStatus;
  url: string;
  r2Key?: string;
  telegramFileId?: string;
  thumbnailUrl?: string;
  description?: string;
  tags: string[];
  uploadedAt: string;
  updatedAt: string;
  isPublic: boolean;
  downloads: number;
  versions: FileVersion[];
  metadata?: {
    width?: number;
    height?: number;
    duration?: number;
    format?: string;
  };
}

export interface FileVersion {
  id: string;
  fileId: string;
  versionNumber: number;
  size: number;
  r2Key?: string;
  createdAt: string;
  uploadedBy: string;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  loaded: number;
  total: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface FileUploadResponse {
  success: boolean;
  file?: FileMetadata;
  error?: string;
}

export interface FileFilter {
  searchText?: string;
  fileType?: FileType;
  dateFrom?: string;
  dateTo?: string;
  sizeMin?: number;
  sizeMax?: number;
  tags?: string[];
  sortBy?: 'date' | 'size' | 'name';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface FileListResponse {
  files: FileMetadata[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface DataCenterStats {
  totalFiles: number;
  totalSize: string;
  filesByType: Record<FileType, number>;
  lastUpload?: string;
  storageUsage: {
    used: string;
    limit: string;
    percentage: number;
  };
}

export interface SharedFile {
  id: string;
  fileId: string;
  shareToken: string;
  userId: string;
  sharedWith?: string[];
  sharedAt: string;
  expiresAt?: string;
  downloadCount: number;
  maxDownloads?: number;
  isPublic: boolean;
}

export interface FileContextType {
  files: FileMetadata[];
  isLoading: boolean;
  error: string | null;
  stats: DataCenterStats | null;
  uploadProgress: UploadProgress[];
  
  uploadFile: (file: File, description?: string, tags?: string[]) => Promise<void>;
  deleteFile: (fileId: string) => Promise<void>;
  updateFileMetadata: (fileId: string, metadata: Partial<FileMetadata>) => Promise<void>;
  downloadFile: (fileId: string) => Promise<void>;
  shareFile: (fileId: string, options: Partial<SharedFile>) => Promise<SharedFile>;
  fetchFiles: (filter?: FileFilter) => Promise<void>;
  searchFiles: (query: string) => Promise<void>;
}
