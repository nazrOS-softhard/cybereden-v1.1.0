
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
