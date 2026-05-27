
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
