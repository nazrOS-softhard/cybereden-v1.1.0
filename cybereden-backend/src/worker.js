import { Router } from 'itty-router';
import { authMiddleware, handleError, HTTPException, createCORSResponse } from './middleware/auth.js';
import {
  githubAuthHandler,
  twitchAuthHandler,
  logoutHandler,
  getCurrentUserHandler,
  refreshTokenHandler,
} from './routes/auth.js';
import {
  uploadAvatarHandler,
  uploadAssetHandler,
  deleteAssetHandler,
  downloadAssetHandler,
} from './routes/upload.js';
import {
  getAssetsHandler,
  getUserAssetsHandler,
  getMyAssetsHandler,
  getAssetHandler,
  updateAssetVisibilityHandler,
} from './routes/assets.js';
import {
  getProfileHandler,
  updateProfileHandler,
  getLeaderboardHandler,
  searchUsersHandler,
  getUserStatsHandler,
  getMyProfileHandler,
} from './routes/profile.js';
import {
  addXPHandler,
  getXPLogsHandler,
  getXPLeaderboardHandler,
  getUserLevelHandler,
  getStatsHandler,
} from './routes/xp.js';

// ==================== ROUTER ====================
const router = Router();

// ==================== CORS PREFLIGHT ====================
router.options('*', () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
});

// ==================== HEALTH CHECK ====================
router.get('/health', () => {
  return createCORSResponse({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==================== AUTH ROUTES ====================
router.post('/auth/github', githubAuthHandler);
router.post('/auth/twitch', twitchAuthHandler);
router.post('/auth/logout', logoutHandler);
router.get('/auth/me', getCurrentUserHandler);
router.post('/auth/refresh', refreshTokenHandler);

// ==================== UPLOAD ROUTES ====================
router.post('/upload/avatar', uploadAvatarHandler);
router.post('/upload/asset', uploadAssetHandler);
router.delete('/assets/:id', deleteAssetHandler);
router.get('/download/:id', downloadAssetHandler);

// ==================== ASSETS ROUTES (DATACENTER) ====================
router.get('/assets', getAssetsHandler);
router.get('/assets/user/:userId', getUserAssetsHandler);
router.get('/assets/my', getMyAssetsHandler);
router.get('/assets/:id', getAssetHandler);
router.put('/assets/:id/visibility', updateAssetVisibilityHandler);

// ==================== PROFILE ROUTES ====================
router.get('/profile', getMyProfileHandler);
router.get('/profile/:userId', getProfileHandler);
router.put('/profile', updateProfileHandler);
router.get('/profile/:userId/stats', getUserStatsHandler);
router.get('/leaderboard', getLeaderboardHandler);
router.get('/search/users', searchUsersHandler);

// ==================== XP ROUTES ====================
router.post('/xp/add', addXPHandler);
router.get('/xp/logs', getXPLogsHandler);
router.get('/xp/logs/:userId', getXPLogsHandler);
router.get('/xp/leaderboard', getXPLeaderboardHandler);
router.get('/xp/level/:userId', getUserLevelHandler);
router.get('/stats', getStatsHandler);

// ==================== 404 ====================
router.all('*', () => {
  return createCORSResponse(
    {
      error: 'Not Found',
      code: 'NOT_FOUND',
      message: 'The requested endpoint does not exist',
    },
    404
  );
});

// ==================== MAIN HANDLER ====================
export default {
  async fetch(request, env, ctx) {
    try {
      console.log(`[${new Date().toISOString()}] ${request.method} ${new URL(request.url).pathname}`);

      const context = {
        env,
        req: request,
        user: undefined,
        params: {},
      };

      await authMiddleware(context);

      const response = await router.handle(request, context);

      const corsResponse = new Response(response.body, response);
      const origin = request.headers.get('origin');
      const allowedOrigins = (env.CORS_ORIGINS || '').split(',').map((o) => o.trim());

      if (allowedOrigins.includes(origin || '') || allowedOrigins.includes('*')) {
        corsResponse.headers.set('Access-Control-Allow-Origin', origin || '*');
      }

      corsResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      corsResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      corsResponse.headers.set('Access-Control-Max-Age', '86400');

      return corsResponse;
    } catch (error) {
      console.error('Request error:', error);
      return handleError(error);
    }
  },
};
