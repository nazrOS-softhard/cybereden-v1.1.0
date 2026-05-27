
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
