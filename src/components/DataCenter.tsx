
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
