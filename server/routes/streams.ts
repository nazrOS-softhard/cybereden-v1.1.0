
/**
 * STREAM TYPES
 * Типы для трансляций и OBS конфигурации
 */

export enum StreamStatus {
  IDLE = 'idle',
  STARTING = 'starting',
  LIVE = 'live',
  PAUSED = 'paused',
  STOPPING = 'stopping',
  OFFLINE = 'offline',
}

export enum StreamQuality {
  P720_30FPS = '720p30',
  P720_60FPS = '720p60',
  P1080_30FPS = '1080p30',
  P1080_60FPS = '1080p60',
  P1440_30FPS = '1440p30',
  P1440_60FPS = '1440p60',
  P2160_30FPS = '2160p30',
  P2160_60FPS = '2160p60',
}

export enum Bitrate {
  LOW = '2500',     // 2.5 Mbps
  MEDIUM = '5000',  // 5 Mbps
  HIGH = '8000',    // 8 Mbps
  ULTRA = '15000',  // 15 Mbps
}

export interface StreamConfig {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: StreamStatus;
  quality: StreamQuality;
  bitrate: Bitrate;
  fps: number;
  resolution: {
    width: number;
    height: number;
  };
  audioConfig: {
    sampleRate: number;
    channels: 1 | 2;
    bitrate: number;
  };
  encoderSettings: {
    encoder: 'h264' | 'vp8' | 'vp9';
    preset: 'ultrafast' | 'fast' | 'medium' | 'slow';
    profile: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OBSProfile {
  id: string;
  userId: string;
  name: string;
  description?: string;
  rtmpUrl: string;
  streamKey: string;
  videoSettings: {
    baseResolution: string;
    outputResolution: string;
    fpsInt: number;
  };
  audioSettings: {
    sampleRate: number;
    channels: 1 | 2;
  };
  outputSettings: {
    audioCodec: string;
    audioMixerType: string;
    audioBitrate: number;
    videoCodec: string;
    videoBitrate: number;
    videoPreset: string;
  };
  advancedSettings: {
    processBuffer: number;
    audioFilterFactory: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface StreamSession {
  id: string;
  configId: string;
  userId: string;
  startedAt: string;
  endedAt?: string;
  duration: number;
  viewers: number;
  recordingUrl?: string;
  thumbnail?: string;
  title: string;
  category?: string;
  isPublic: boolean;
}

export interface StreamTimer {
  isVisible: boolean;
  showHours: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  formattedTime: string;
}

export interface OBSScene {
  name: string;
  sources: OBSSource[];
}

export interface OBSSource {
  name: string;
  inputKind: string;
  inputSettings: Record<string, unknown>;
  filters?: OBSFilter[];
}

export interface OBSFilter {
  filterKind: string;
  filterSettings: Record<string, unknown>;
}

export interface OBSWebsocketConfig {
  host: string;
  port: number;
  password?: string;
  version: number;
}

export interface StreamContextType {
  config: StreamConfig | null;
  session: StreamSession | null;
  status: StreamStatus;
  timer: StreamTimer;
  isLoading: boolean;
  error: string | null;
  
  startStream: (configId: string) => Promise<void>;
  stopStream: () => Promise<void>;
  pauseStream: () => Promise<void>;
  resumeStream: () => Promise<void>;
  updateStreamConfig: (config: Partial<StreamConfig>) => Promise<void>;
  createOBSProfile: (profile: OBSProfile) => Promise<void>;
  updateOBSProfile: (profileId: string, profile: Partial<OBSProfile>) => Promise<void>;
  fetchStreamConfig: (configId: string) => Promise<void>;
  getStreamKey: () => Promise<string>;
  generateRTMPUrl: () => string;
}

export interface StreamUIState {
  showControls: boolean;
  showTimer: boolean;
  isFullscreen: boolean;
  hideTimer: boolean;
  cursorVisible: boolean;
}
