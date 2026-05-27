import { User, Asset, Session, XPLog, UserProfile } from '../types/index';
import { v4 as uuidv4 } from 'uuid';

// ==================== USER OPERATIONS ====================
export async function getUserById(db: D1Database, id: string): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE id = ?1')
    .bind(id)
    .first<User>();
  
  return result || null;
}

export async function getUserByGithubId(db: D1Database, githubId: number): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE github_id = ?1')
    .bind(githubId)
    .first<User>();
  
  return result || null;
}

export async function getUserByTwitchId(db: D1Database, twitchId: string): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE twitch_id = ?1')
    .bind(twitchId)
    .first<User>();
  
  return result || null;
}

export async function getUserByUsername(db: D1Database, username: string): Promise<User | null> {
  const result = await db
    .prepare('SELECT * FROM users WHERE github_username = ?1 OR twitch_username = ?1')
    .bind(username)
    .first<User>();
  
  return result || null;
}

export async function createUser(
  db: D1Database,
  data: {
    github_id?: number;
    twitch_id?: string;
    github_username?: string;
    twitch_username?: string;
    display_name: string;
    email?: string;
    avatar_url?: string;
  }
): Promise<User> {
  const id = uuidv4();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO users 
       (id, github_id, twitch_id, github_username, twitch_username, display_name, email, avatar_url, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    )
    .bind(
      id,
      data.github_id || null,
      data.twitch_id || null,
      data.github_username || null,
      data.twitch_username || null,
      data.display_name,
      data.email || null,
      data.avatar_url || null,
      now,
      now
    )
    .run();

  return getUserById(db, id) as Promise<User>;
}

export async function updateUser(
  db: D1Database,
  id: string,
  data: Partial<User>
): Promise<User | null> {
  const updates: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key !== 'id' && key !== 'created_at') {
      updates.push(`${key} = ?${values.length + 1}`);
      values.push(value);
    }
  }

  if (updates.length === 0) return getUserById(db, id);

  values.push(new Date().toISOString());
  values.push(id);

  await db
    .prepare(`UPDATE users SET ${updates.join(', ')}, updated_at = ?${values.length - 1} WHERE id = ?${values.length}`)
    .bind(...values)
    .run();

  return getUserById(db, id);
}

export async function getUserProfile(db: D1Database, id: string): Promise<UserProfile | null> {
  const user = await getUserById(db, id);
  if (!user) return null;

  const stats = await db
    .prepare(
      `SELECT 
        COUNT(DISTINCT a.id) as asset_count,
        COALESCE(SUM(d.downloads), 0) as total_downloads
       FROM assets a
       LEFT JOIN downloads d ON a.id = d.asset_id
       WHERE a.user_id = ?1`
    )
    .bind(id)
    .first<{ asset_count: number; total_downloads: number }>();

  return {
    ...user,
    asset_count: stats?.asset_count || 0,
    total_downloads: stats?.total_downloads || 0,
  };
}

// ==================== ASSET OPERATIONS ====================
export async function createAsset(
  db: D1Database,
  data: {
    user_id: string;
    file_name: string;
    file_key: string;
    file_size: number;
    file_type: string;
    mime_type: string;
    url: string;
    is_public?: boolean;
  }
): Promise<Asset> {
  const id = uuidv4();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO assets 
       (id, user_id, file_name, file_key, file_size, file_type, mime_type, url, is_public, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    )
    .bind(
      id,
      data.user_id,
      data.file_name,
      data.file_key,
      data.file_size,
      data.file_type,
      data.mime_type,
      data.url,
      data.is_public ?? true,
      now,
      now
    )
    .run();

  return getAssetById(db, id) as Promise<Asset>;
}

export async function getAssetById(db: D1Database, id: string): Promise<Asset | null> {
  return db
    .prepare('SELECT * FROM assets WHERE id = ?1')
    .bind(id)
    .first<Asset>();
}

export async function getAssetsByUserId(
  db: D1Database,
  userId: string,
  isPublic?: boolean
): Promise<Asset[]> {
  let query = 'SELECT * FROM assets WHERE user_id = ?1';
  const params: unknown[] = [userId];

  if (isPublic !== undefined) {
    query += ' AND is_public = ?2';
    params.push(isPublic);
  }

  query += ' ORDER BY created_at DESC';

  return db.prepare(query).bind(...params).all<Asset>();
}

export async function getPublicAssets(
  db: D1Database,
  limit: number = 50,
  offset: number = 0
): Promise<{ assets: (Asset & { user: { id: string; display_name: string; avatar_url: string | null } })[], total: number }> {
  const assets = await db
    .prepare(
      `SELECT a.*, u.id as user_id, u.display_name, u.avatar_url
       FROM assets a
       JOIN users u ON a.user_id = u.id
       WHERE a.is_public = 1 AND u.is_public = 1
       ORDER BY a.created_at DESC
       LIMIT ?1 OFFSET ?2`
    )
    .bind(limit, offset)
    .all<any>();

  const countResult = await db
    .prepare(
      `SELECT COUNT(*) as total FROM assets a
       JOIN users u ON a.user_id = u.id
       WHERE a.is_public = 1 AND u.is_public = 1`
    )
    .first<{ total: number }>();

  const formattedAssets = assets.map(a => ({
    ...a,
    user: {
      id: a.user_id,
      display_name: a.display_name,
      avatar_url: a.avatar_url,
    },
  }));

  return {
    assets: formattedAssets,
    total: countResult?.total || 0,
  };
}

export async function incrementAssetDownloads(db: D1Database, assetId: string): Promise<void> {
  await db
    .prepare('UPDATE assets SET downloads = downloads + 1 WHERE id = ?1')
    .bind(assetId)
    .run();
}

// ==================== SESSION OPERATIONS ====================
export async function createSession(
  db: D1Database,
  userId: string,
  token: string,
  provider: 'github' | 'twitch',
  expiresIn: number = 7 * 24 * 60 * 60 * 1000 // 7 дней
): Promise<Session> {
  const id = uuidv4();
  const expiresAt = new Date(Date.now() + expiresIn).toISOString();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO sessions (id, user_id, token, provider, expires_at, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    )
    .bind(id, userId, token, provider, expiresAt, now)
    .run();

  return {
    id,
    user_id: userId,
    token,
    provider,
    expires_at: expiresAt,
    created_at: now,
  };
}

export async function getSessionByToken(db: D1Database, token: string): Promise<Session | null> {
  return db
    .prepare('SELECT * FROM sessions WHERE token = ?1 AND expires_at > datetime("now")')
    .bind(token)
    .first<Session>();
}

export async function deleteSession(db: D1Database, token: string): Promise<void> {
  await db
    .prepare('DELETE FROM sessions WHERE token = ?1')
    .bind(token)
    .run();
}

// ==================== XP OPERATIONS ====================
export async function addXP(
  db: D1Database,
  userId: string,
  amount: number,
  reason: string,
  assetId?: string
): Promise<{ xp_awarded: number; new_total_xp: number }> {
  const id = uuidv4();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO xp_logs (id, user_id, amount, reason, asset_id, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    )
    .bind(id, userId, amount, reason, assetId || null, now)
    .run();

  await db
    .prepare('UPDATE users SET xp = xp + ?1 WHERE id = ?2')
    .bind(amount, userId)
    .run();

  const user = await getUserById(db, userId);

  return {
    xp_awarded: amount,
    new_total_xp: user?.xp || 0,
  };
}

export async function getXPLogs(
  db: D1Database,
  userId: string,
  limit: number = 50
): Promise<XPLog[]> {
  return db
    .prepare(
      'SELECT * FROM xp_logs WHERE user_id = ?1 ORDER BY created_at DESC LIMIT ?2'
    )
    .bind(userId, limit)
    .all<XPLog>();
}

// ==================== DOWNLOAD TRACKING ====================
export async function trackDownload(
  db: D1Database,
  assetId: string,
  userId: string | null,
  ipAddress: string,
  userAgent: string
): Promise<void> {
  const id = uuidv4();
  const now = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO downloads (id, asset_id, user_id, ip_address, user_agent, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    )
    .bind(id, assetId, userId || null, ipAddress, userAgent, now)
    .run();

  await incrementAssetDownloads(db, assetId);
}

// ==================== LEADERBOARD ====================
export async function getTopUsers(
  db: D1Database,
  limit: number = 100
): Promise<User[]> {
  return db
    .prepare(
      'SELECT * FROM users WHERE is_public = 1 ORDER BY xp DESC LIMIT ?1'
    )
    .bind(limit)
    .all<User>();
}
