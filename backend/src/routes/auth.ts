import { Context, AuthResponse, GitHubUser, TwitchUser } from '../types/index.js';
import {
  generateOAuthState,
  generateJWT,
  getGitHubToken,
  getGitHubUser,
  getGitHubUserEmail,
  getTwitchToken,
  getTwitchUser,
} from '../lib/auth.js';
import {
  getUserByGithubId,
  getUserByTwitchId,
  createUser,
  createSession,
  updateUser,
} from '../lib/db.js';
import {
  HTTPException,
  createCORSResponse,
  getClientIP,
} from '../middleware/auth.js';

// ==================== GITHUB OAUTH ====================
export async function githubAuthHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      throw new HTTPException(400, 'Missing authorization code');
    }

    // Получаем токен от GitHub
    const tokenData = await getGitHubToken(code, context.env);

    // Получаем данные пользователя
    const githubUser = await getGitHubUser(tokenData.access_token);

    // Получаем email если нет в основных данных
    if (!githubUser.email) {
      const email = await getGitHubUserEmail(tokenData.access_token);
      if (email) {
        githubUser.email = email;
      }
    }

    // Проверяем, существует ли пользователь
    let user = await getUserByGithubId(context.env.DB, githubUser.id);

    if (!user) {
      // Создаем нового пользователя
      user = await createUser(context.env.DB, {
        github_id: githubUser.id,
        github_username: githubUser.login,
        display_name: githubUser.name,
        email: githubUser.email || undefined,
        avatar_url: githubUser.avatar_url,
      });
    } else {
      // Обновляем существующего пользователя
      user = await updateUser(context.env.DB, user.id, {
        avatar_url: githubUser.avatar_url,
        email: githubUser.email || user.email,
      });
    }

    // Генерируем JWT
    const jwtToken = generateJWT(user!.id, context.env.JWT_SECRET);

    // Сохраняем сессию
    await createSession(
      context.env.DB,
      user!.id,
      jwtToken,
      'github',
      7 * 24 * 60 * 60 * 1000
    );

    const response: AuthResponse = {
      user: user!,
      token: jwtToken,
      expires_in: 7 * 24 * 60 * 60,
    };

    return createCORSResponse(response, 200);
  } catch (error) {
    console.error('GitHub auth error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        { error: error.message, code: error.code },
        error.status
      );
    }

    return createCORSResponse(
      { error: 'Authentication failed', code: 'AUTH_FAILED' },
      500
    );
  }
}

// ==================== TWITCH OAUTH ====================
export async function twitchAuthHandler(context: Context): Promise<Response> {
  try {
    const url = new URL(context.req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (!code) {
      throw new HTTPException(400, 'Missing authorization code');
    }

    // Получаем токен от Twitch
    const tokenData = await getTwitchToken(code, context.env);

    // Получаем данные пользователя
    const twitchUser = await getTwitchUser(tokenData.access_token, context.env.TWITCH_CLIENT_ID);

    // Проверяем, существует ли пользователь
    let user = await getUserByTwitchId(context.env.DB, twitchUser.id);

    if (!user) {
      // Создаем нового пользователя
      user = await createUser(context.env.DB, {
        twitch_id: twitchUser.id,
        twitch_username: twitchUser.login,
        display_name: twitchUser.display_name,
        email: twitchUser.email,
        avatar_url: twitchUser.profile_image_url,
      });
    } else {
      // Обновляем существующего пользователя
      user = await updateUser(context.env.DB, user.id, {
        avatar_url: twitchUser.profile_image_url,
        email: twitchUser.email || user.email,
      });
    }

    // Генерируем JWT
    const jwtToken = generateJWT(user!.id, context.env.JWT_SECRET);

    // Сохраняем сессию
    await createSession(
      context.env.DB,
      user!.id,
      jwtToken,
      'twitch',
      7 * 24 * 60 * 60 * 1000
    );

    const response: AuthResponse = {
      user: user!,
      token: jwtToken,
      expires_in: 7 * 24 * 60 * 60,
    };

    return createCORSResponse(response, 200);
  } catch (error) {
    console.error('Twitch auth error:', error);

    if (error instanceof HTTPException) {
      return createCORSResponse(
        { error: error.message, code: error.code },
        error.status
      );
    }

    return createCORSResponse(
      { error: 'Authentication failed', code: 'AUTH_FAILED' },
      500
    );
  }
}

// ==================== LOGOUT ====================
export async function logoutHandler(context: Context): Promise<Response> {
  try {
    if (!context.user) {
      throw new HTTPException(401, 'Unauthorized');
    }

    // Здесь можно удалить сессию из БД
    return createCORSResponse({ message: 'Logged out successfully' }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return createCORSResponse(
        { error: error.message, code: error.code },
        error.status
      );
    }

    return createCORSResponse(
      { error: 'Logout failed' },
      500
    );
  }
}

// ==================== GET CURRENT USER ====================
export async function getCurrentUserHandler(context: Context): Promise<Response> {
  try {
    if (!context.user) {
      throw new HTTPException(401, 'Unauthorized');
    }

    return createCORSResponse({ user: context.user }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      return createCORSResponse(
        { error: error.message, code: error.code },
        error.status
      );
    }

    return createCORSResponse(
      { error: 'Failed to get user' },
      500
    );
  }
}

// ==================== REFRESH TOKEN ====================
export async function refreshTokenHandler(context: Context): Promise<Response> {
  try {
    if (!context.user) {
      throw new HTTPException(401, 'Unauthorized');
    }

    const newToken = generateJWT(context.user.id, context.env.JWT_SECRET);

    return createCORSResponse(
      {
        token: newToken,
        expires_in: 7 * 24 * 60 * 60,
      },
      200
    );
  } catch (error) {
    if (error instanceof HTTPException) {
      return createCORSResponse(
        { error: error.message, code: error.code },
        error.status
      );
    }

    return createCORSResponse(
      { error: 'Token refresh failed' },
      500
    );
  }
}

export default router;
