
/**
 * API CLIENT
 * Конфигурация axios для работы с API
 */

import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Добавить токен к каждому запросу
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Обработать ошибки
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Токен истек, очистить хранилище
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_session');
          window.location.href = '/auth/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // AUTH ENDPOINTS
  async loginCallback(code: string, state: string, provider: 'twitch' | 'github') {
    return this.client.post('/api/auth/callback', { code, state, provider });
  }

  async logout() {
    return this.client.post('/api/auth/logout');
  }

  async refreshToken() {
    return this.client.post('/api/auth/refresh');
  }

  // USER ENDPOINTS
  async getUserProfile() {
    return this.client.get('/api/user/profile');
  }

  async updateUserProfile(data: Record<string, unknown>) {
    return this.client.put('/api/user/profile', data);
  }

  async getUserStats() {
    return this.client.get('/api/user/stats');
  }

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.client.post('/api/user/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  async deleteAvatar() {
    return this.client.delete('/api/user/avatar');
  }

  // FILE ENDPOINTS
  async uploadFile(file: File, description?: string, tags?: string[]) {
    const formData = new FormData();
    formData.append('file', file);
    if (description) formData.append('description', description);
    if (tags) formData.append('tags', JSON.stringify(tags));

    return this.client.post('/api/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        document.dispatchEvent(
          new CustomEvent('file-upload-progress', { detail: { progress } })
        );
      },
    });
  }

  async getFiles(filter?: Record<string, unknown>) {
    return this.client.get('/api/files', { params: filter });
  }

  async deleteFile(fileId: string) {
    return this.client.delete(`/api/files/${fileId}`);
  }

  async updateFile(fileId: string, data: Record<string, unknown>) {
    return this.client.put(`/api/files/${fileId}`, data);
  }

  async downloadFile(fileId: string) {
    return this.client.get(`/api/files/${fileId}/download`, {
      responseType: 'blob',
    });
  }

  async shareFile(fileId: string, options: Record<string, unknown>) {
    return this.client.post(`/api/files/${fileId}/share`, options);
  }

  // STREAM ENDPOINTS
  async getStreamConfig(configId: string) {
    return this.client.get(`/api/streams/${configId}`);
  }

  async createStreamConfig(config: Record<string, unknown>) {
    return this.client.post('/api/streams', config);
  }

  async updateStreamConfig(configId: string, config: Record<string, unknown>) {
    return this.client.put(`/api/streams/${configId}`, config);
  }

  async startStream(configId: string) {
    return this.client.post(`/api/streams/${configId}/start`);
  }

  async stopStream(configId: string) {
    return this.client.post(`/api/streams/${configId}/stop`);
  }

  async getStreamKey() {
    return this.client.get('/api/streams/key');
  }

  // OBS ENDPOINTS
  async createOBSProfile(profile: Record<string, unknown>) {
    return this.client.post('/api/streams/obs-profiles', profile);
  }

  async updateOBSProfile(profileId: string, profile: Record<string, unknown>) {
    return this.client.put(`/api/streams/obs-profiles/${profileId}`, profile);
  }

  async getOBSProfile(profileId: string) {
    return this.client.get(`/api/streams/obs-profiles/${profileId}`);
  }

  async getOBSConfig() {
    return this.client.get('/api/streams/obs-config');
  }

  // HEALTH CHECK
  async health() {
    return this.client.get('/api/health');
  }
}

export const apiClient = new APIClient();
export default apiClient;
