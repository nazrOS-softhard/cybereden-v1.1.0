
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
