# 📚 Примеры использования API CyberEden Backend

## React Hooks для API

### 1. Хук для аутентификации

```typescript
// hooks/useAuth.ts
import { useState, useCallback } from 'react';

interface User {
  id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
  });

  const loginWithGitHub = useCallback(async (code: string) => {
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const response = await fetch(`${API_BASE_URL}/auth/github`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) throw new Error('Auth failed');

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setState(s => ({
        ...s,
        user: data.user,
        token: data.token,
        loading: false,
      }));
    } catch (error) {
      setState(s => ({
        ...s,
        error: error instanceof Error ? error.message : 'Unknown error',
        loading: false,
      }));
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setState({
      user: null,
      token: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    loginWithGitHub,
    logout,
  };
}
```

### 2. Хук для загрузки файлов

```typescript
// hooks/useUpload.ts
import { useState } from 'react';

interface UploadState {
  loading: boolean;
  error: string | null;
  progress: number;
}

export function useUpload(token: string | null) {
  const [state, setState] = useState<UploadState>({
    loading: false,
    error: null,
    progress: 0,
  });

  const uploadAsset = async (file: File, isPublic = true) => {
    if (!token) throw new Error('Not authenticated');

    setState({ loading: true, error: null, progress: 0 });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('isPublic', String(isPublic));

    try {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          setState(s => ({
            ...s,
            progress: Math.round((e.loaded / e.total) * 100),
          }));
        }
      });

      return new Promise((resolve, reject) => {
        xhr.addEventListener('load', () => {
          if (xhr.status === 201) {
            const data = JSON.parse(xhr.responseText);
            setState({ loading: false, error: null, progress: 100 });
            resolve(data);
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          setState(s => ({
            ...s,
            error: 'Upload failed',
            loading: false,
          }));
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', `${API_BASE_URL}/upload/asset`);
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.send(formData);
      });
    } catch (error) {
      setState({
        loading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
        progress: 0,
      });
      throw error;
    }
  };

  const uploadAvatar = async (file: File) => {
    if (!token) throw new Error('Not authenticated');

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/avatar`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Avatar upload failed');
    return response.json();
  };

  return {
    ...state,
    uploadAsset,
    uploadAvatar,
  };
}
```

### 3. Хук для получения активов

```typescript
// hooks/useAssets.ts
import { useState, useEffect } from 'react';

interface Asset {
  id: string;
  file_name: string;
  file_type: string;
  file_size: number;
  downloads: number;
  url: string;
  user?: {
    id: string;
    display_name: string;
    avatar_url?: string;
  };
}

export function useAssets(userId?: string, token?: string | null) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        let url = `${API_BASE_URL}/assets`;
        if (userId) {
          url = `${API_BASE_URL}/assets/user/${userId}`;
        } else if (token) {
          url = `${API_BASE_URL}/assets/my`;
        }

        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch assets');

        const data = await response.json();
        setAssets(data.assets || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assets');
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [userId, token]);

  return { assets, loading, error };
}
```

### 4. Хук для профилей

```typescript
// hooks/useProfile.ts
import { useState, useEffect } from 'react';

interface UserProfile {
  id: string;
  display_name: string;
  avatar_url?: string;
  xp: number;
  level: number;
  bio?: string;
  asset_count: number;
  total_downloads: number;
}

export function useProfile(userId?: string, token?: string | null) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let url = `${API_BASE_URL}/profile`;
        if (userId) {
          url = `${API_BASE_URL}/profile/${userId}`;
        }

        const headers: HeadersInit = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        setProfile(data.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  return { profile, loading, error };
}
```

## React Компоненты

### 1. Кнопка GitHub Login

```typescript
// components/GitHubLoginButton.tsx
import { useEffect } from 'react';

interface GitHubLoginButtonProps {
  onSuccess: (code: string) => void;
}

const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

export function GitHubLoginButton({ onSuccess }: GitHubLoginButtonProps) {
  useEffect(() => {
    const url = new URL(window.location);
    const code = url.searchParams.get('code');

    if (code) {
      onSuccess(code);
      // Очистить URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSuccess]);

  const handleLogin = () => {
    const redirectUri = `${window.location.origin}/auth/github`;
    const scopes = 'user:email';
    const state = Math.random().toString(36);

    sessionStorage.setItem('oauth_state', state);

    window.location.href = 
      `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
      `state=${state}`;
  };

  return (
    <button onClick={handleLogin} className="btn btn-github">
      Login with GitHub
    </button>
  );
}
```

### 2. Компонент загрузки файла

```typescript
// components/AssetUploader.tsx
import { useState } from 'react';
import { useUpload } from '@/hooks/useUpload';

interface AssetUploaderProps {
  token: string | null;
  onSuccess?: (asset: any) => void;
}

export function AssetUploader({ token, onSuccess }: AssetUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(true);
  const { loading, error, progress, uploadAsset } = useUpload(token);

  const handleUpload = async () => {
    if (!file) return;

    try {
      const result = await uploadAsset(file, isPublic);
      onSuccess?.(result.asset);
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  return (
    <div className="uploader">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        disabled={loading}
      />

      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Public
      </label>

      <button onClick={handleUpload} disabled={!file || loading}>
        Upload {loading && `(${progress}%)`}
      </button>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

### 3. Компонент профиля

```typescript
// components/Profile.tsx
import { useProfile } from '@/hooks/useProfile';
import { useAssets } from '@/hooks/useAssets';

interface ProfileProps {
  userId: string;
  token?: string | null;
}

export function Profile({ userId, token }: ProfileProps) {
  const { profile, loading, error } = useProfile(userId, token);
  const { assets } = useAssets(userId);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!profile) return <div>Profile not found</div>;

  return (
    <div className="profile">
      <img src={profile.avatar_url} alt={profile.display_name} />

      <h1>{profile.display_name}</h1>

      <div className="stats">
        <div>
          <span className="label">Level</span>
          <span className="value">{profile.level}</span>
        </div>
        <div>
          <span className="label">XP</span>
          <span className="value">{profile.xp.toLocaleString()}</span>
        </div>
        <div>
          <span className="label">Assets</span>
          <span className="value">{profile.asset_count}</span>
        </div>
        <div>
          <span className="label">Downloads</span>
          <span className="value">{profile.total_downloads}</span>
        </div>
      </div>

      {profile.bio && <p className="bio">{profile.bio}</p>}

      <div className="assets">
        <h2>Assets</h2>
        {assets.map(asset => (
          <div key={asset.id} className="asset-card">
            <h3>{asset.file_name}</h3>
            <p>Type: {asset.file_type}</p>
            <p>Downloads: {asset.downloads}</p>
            <a href={asset.url} download>
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 4. DATACENTER компонент

```typescript
// components/DataCenter.tsx
import { useState } from 'react';
import { useAssets } from '@/hooks/useAssets';

export function DataCenter() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [page, setPage] = useState(1);

  const { assets, loading } = useAssets();

  const params = new URLSearchParams({
    search,
    sort: sortBy,
    page: String(page),
  });

  return (
    <div className="datacenter">
      <h1>🗄️ DATACENTER</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="recent">Recent</option>
          <option value="popular">Popular</option>
          <option value="trending">Trending</option>
        </select>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="assets-grid">
          {assets.map(asset => (
            <div key={asset.id} className="asset-card">
              <h3>{asset.file_name}</h3>
              <p className="creator">by {asset.user?.display_name}</p>
              <p className="type">{asset.file_type.toUpperCase()}</p>
              <p className="downloads">⬇️ {asset.downloads}</p>
              <a href={`/download/${asset.id}`} className="btn">
                Download
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
```

## Fetch примеры

### 1. Загрузить актив через curl

```bash
curl -X POST http://localhost:8787/upload/asset \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@document.pdf" \
  -F "isPublic=true"
```

### 2. Получить публичные активы

```bash
curl "http://localhost:8787/assets?page=1&limit=50&sort=popular"
```

### 3. Скачать файл

```bash
curl -X GET http://localhost:8787/download/ASSET_ID \
  -o downloaded_file.pdf
```

### 4. Получить профиль пользователя

```bash
curl http://localhost:8787/profile/USER_ID
```

### 5. Обновить профиль

```bash
curl -X PUT http://localhost:8787/profile \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"display_name":"New Name","bio":"My bio"}'
```

## TypeScript типы для фронтенда

```typescript
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
```

## Env переменные для фронтенда

```env
# .env
VITE_API_BASE_URL=http://localhost:8787
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_TWITCH_CLIENT_ID=your_twitch_client_id

# .env.production
VITE_API_BASE_URL=https://api.cybereden.com
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_TWITCH_CLIENT_ID=your_twitch_client_id
```
