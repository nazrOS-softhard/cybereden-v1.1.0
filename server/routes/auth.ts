
/**
 * AUTH TYPES
 * Типы для системы авторизации и OAuth
 */

export enum OAuthProvider {
  TWITCH = 'twitch',
  GITHUB = 'github',
}

export interface OAuthConfig {
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  scopes: string[];
}

export interface OAuthResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
  tokenType: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  avatar: string;
  provider: OAuthProvider;
  providerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  expiresAt: string;
  isValid: boolean;
}

export interface AuthState {
  session: AuthSession | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  success: boolean;
  session?: AuthSession;
  error?: string;
}

export interface TokenPayload {
  userId: string;
  provider: OAuthProvider;
  iat: number;
  exp: number;
}

export interface OAuthCallbackParams {
  code: string;
  state: string;
  error?: string;
  error_description?: string;
}

export interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

export interface TwitchUserData {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
  email?: string;
}

export interface GitHubUserData {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  email: string;
}

export interface AuthContextType {
  session: AuthSession | null;
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  loginWithOAuth: (provider: OAuthProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}
