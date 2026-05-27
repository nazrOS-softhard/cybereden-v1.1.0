
// types/api.ts
export interface User {
  id: string;
  display_name: string;
  email?: string;
  avatar_url?: string;
  xp: number;
  level: number;
  is_public: boolean;
  created_at: string;
}

export interface Asset {
  id: string;
  user_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  url: string;
  downloads: number;
  created_at: string;
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
