
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
