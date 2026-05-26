// ==================== ENVIRONMENT ====================
export interface Env {
  DB: D1Database;
  R2_AVATARS: R2Bucket;
  R2_ASSETS: R2Bucket;
  AUTH_CACHE: KVNamespace;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
  JWT_SECRET: string;
  CORS_ORIGINS: string;
  ENVIRONMENT: string;
  API_URL: string;
}

// ==================== USER ====================
export interface User {
  id: string;
  github_id: number | null;
  twitch_id: string | null;
  github_username: string | null;
  twitch_username: string | null;
  display_name: string;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  xp: number;
  level: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  last_login: string | null;
}

export interface UserProfile extends Omit<User, 'email'> {
  asset_count: number;
  total_downloads: number;
}

// ==================== ASSET ====================
export interface Asset {
  id: string;
  user_id: string;
  file_name: string;
  file_key: string;
  file_size: number;
  file_type: string;
  mime_type: string;
  url: string;
  is_public: boolean;
  downloads: number;
  created_at: string;
  updated_at: string;
}

export interface AssetWithUser extends Asset {
  user: {
    id: string;
    display_name: string;
    avatar_url: string | null;
  };
}

// ==================== XP ====================
export interface XPLog {
  id: string;
  user_id: string;
  amount: number;
  reason: string;
  asset_id: string | null;
  created_at: string;
}

// ==================== SESSION ====================
export interface Session {
  id: string;
  user_id: string;
  token: string;
  provider: 'github' | 'twitch';
  expires_at: string;
  created_at: string;
}

// ==================== OAUTH ====================
export interface GitHubUser {
  id: number;
  login: string;
  name: string;
  email: string | null;
  avatar_url: string;
}

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  email: string;
  profile_image_url: string;
}

export interface OAuthToken {
  access_token: string;
  token_type: string;
  scope?: string;
  expires_in?: number;
}

// ==================== REQUEST/RESPONSE ====================
export interface AuthRequest {
  code: string;
  state?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expires_in: number;
}

export interface UploadResponse {
  asset: Asset;
  xp_awarded: number;
  new_total_xp: number;
}

export interface ProfileResponse {
  user: UserProfile;
  assets: Asset[];
}

export interface AssetsListResponse {
  assets: AssetWithUser[];
  total: number;
  page: number;
  limit: number;
}

export interface ErrorResponse {
  error: string;
  message?: string;
  code?: string;
  details?: Record<string, unknown>;
}

// ==================== CONTEXT ====================
export interface Context {
  env: Env;
  req: Request;
  user?: User;
  params: Record<string, string>;
}

// ==================== DOWNLOADS ====================
export interface Download {
  id: string;
  asset_id: string;
  user_id: string | null;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

// ==================== SETTINGS ====================
export interface UserSettings {
  id: string;
  user_id: string;
  notifications_enabled: boolean;
  profile_visibility: 'public' | 'private' | 'friends';
  allow_dm: boolean;
  created_at: string;
  updated_at: string;
}
