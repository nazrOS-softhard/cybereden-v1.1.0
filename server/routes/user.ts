
/**
 * USER TYPES
 * Типы для профиля пользователя
 */

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  avatarId?: string;
  provider: 'twitch' | 'github';
  providerId: string;
  isVerified: boolean;
  filesCount: number;
  totalFileSize: number;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface UserStats {
  totalFiles: number;
  totalSize: string;
  storageUsed: string;
  storageLimit: string;
  uptime: string;
  lastActivity: string;
}

export interface UserSettings {
  userId: string;
  theme: 'light' | 'dark' | 'auto';
  language: string;
  emailNotifications: boolean;
  twoFactorEnabled: boolean;
  defaultStreamBitrate: number;
  defaultStreamResolution: string;
  autoArchiveStreams: boolean;
  publicProfile: boolean;
}

export interface Avatar {
  id: string;
  userId: string;
  url: string;
  r2Key?: string;
  telegramFileId?: string;
  uploadedAt: string;
  size: number;
  mimeType: string;
  isActive: boolean;
}

export interface AvatarUploadResponse {
  success: boolean;
  avatar?: Avatar;
  url?: string;
  error?: string;
}

export interface UserContextType {
  profile: UserProfile | null;
  stats: UserStats | null;
  settings: UserSettings | null;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
  updateSettings: (data: Partial<UserSettings>) => Promise<void>;
  fetchProfile: () => Promise<void>;
}
