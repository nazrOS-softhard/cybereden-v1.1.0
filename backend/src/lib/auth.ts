import { sign, verify } from 'jsonwebtoken';
import { GitHubUser, TwitchUser, OAuthToken } from '@types/index';

// ==================== JWT ====================
export function generateJWT(
  userId: string,
  jwtSecret: string,
  expiresIn: string = '7d'
): string {
  const token = sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
    },
    jwtSecret,
    { expiresIn }
  );

  return token;
}

export function verifyJWT(token: string, jwtSecret: string): { sub: string; iat: number } | null {
  try {
    const decoded = verify(token, jwtSecret) as { sub: string; iat: number };
    return decoded;
  } catch (error) {
    return null;
  }
}

// ==================== GITHUB OAUTH ====================
export async function getGitHubToken(code: string, env: any): Promise<OAuthToken> {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: `${env.API_URL}/auth/github/callback`,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to get GitHub token');
  }

  return response.json();
}

export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get GitHub user');
  }

  const user = await response.json();

  return {
    id: user.id,
    login: user.login,
    name: user.name || user.login,
    email: user.email,
    avatar_url: user.avatar_url,
  };
}

export async function getGitHubUserEmail(accessToken: string): Promise<string | null> {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const emails = await response.json();
  const primary = emails.find((e: any) => e.primary);
  return primary?.email || null;
}

// ==================== TWITCH OAUTH ====================
export async function getTwitchToken(code: string, env: any): Promise<OAuthToken> {
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: env.TWITCH_CLIENT_ID,
      client_secret: env.TWITCH_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${env.API_URL}/auth/twitch/callback`,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error('Failed to get Twitch token');
  }

  return response.json();
}

export async function getTwitchUser(accessToken: string, clientId: string): Promise<TwitchUser> {
  const response = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Client-ID': clientId,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get Twitch user');
  }

  const data = await response.json();
  const user = data.data[0];

  if (!user) {
    throw new Error('No Twitch user data');
  }

  return {
    id: user.id,
    login: user.login,
    display_name: user.display_name,
    email: user.email,
    profile_image_url: user.profile_image_url,
  };
}

// ==================== OAUTH STATE ====================
export function generateOAuthState(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function verifyOAuthState(state: string, cachedState: string | null): boolean {
  return state === cachedState && !!cachedState;
}

// ==================== GITHUB OAUTH URLS ====================
export function getGitHubAuthUrl(clientId: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${process.env.API_URL || 'http://localhost:8787'}/auth/github/callback`,
    scope: 'user:email',
    state,
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
}

// ==================== TWITCH OAUTH URLS ====================
export function getTwitchAuthUrl(clientId: string, state: string): string {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: `${process.env.API_URL || 'http://localhost:8787'}/auth/twitch/callback`,
    response_type: 'code',
    scope: 'user:read:email',
    state,
  });

  return `https://id.twitch.tv/oauth2/authorize?${params.toString()}`;
}

// ==================== PASSWORD HASHING (if needed for future) ====================
export async function hashPassword(password: string): Promise<string> {
  // Используем Web Crypto API, доступный в Cloudflare Workers
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hash2 = await hashPassword(password);
  return hash === hash2;
}

// ==================== HELPERS ====================
export function extractBearerToken(authHeader: string | null): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

  return parts[1];
}

export function getExpirationSeconds(expiresIn?: number): number {
  return expiresIn || 7 * 24 * 60 * 60; // 7 дней
}
