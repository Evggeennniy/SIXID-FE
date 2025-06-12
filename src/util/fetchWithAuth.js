// fetchWithAuth.js
import Cookies from 'js-cookie';

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
};

const fetchWithAuth = async (url, options = {}, updateTokens, forceLogout) => {
  const access = Cookies.get('access');
  const refresh = Cookies.get('refresh');

  const stringifiedBody =
    options.body && typeof options.body !== 'string'
      ? JSON.stringify(options.body)
      : options.body;

  const applyToken = (token) => ({
    ...options,
    method: options.method || 'GET',
    body: stringifiedBody,
    headers: {
      ...(stringifiedBody ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const retryRequest = async (token) => {
    return await fetch(url, applyToken(token));
  };

  // ⏳ Если кто-то уже обновляет токен — ждем
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(async (newAccessToken) => {
        try {
          const retryResponse = await retryRequest(newAccessToken);
          resolve(retryResponse);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  // 🟡 Попробуем access токен
  let response;
  if (access) {
    response = await retryRequest(access);
    if (response.status !== 401) return response;
  }

  // ❌ Если refresh токена нет
  if (!refresh) {
    forceLogout?.();
    throw new Error('Unauthorized: No refresh token');
  }

  // 🔄 Обновление токена
  isRefreshing = true;

  try {
    const refreshResponse = await fetch('/api/auth/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshResponse.ok) {
      forceLogout?.();
      throw new Error('Token refresh failed');
    }

    const { access: newAccessToken } = await refreshResponse.json();

    if (!newAccessToken) {
      forceLogout?.();
      throw new Error('No new access token returned');
    }

    Cookies.set('access', newAccessToken);
    updateTokens?.(newAccessToken);

    onRefreshed(newAccessToken);

    // ✅ Только теперь делаем retry
    return await retryRequest(newAccessToken);
  } catch (err) {
    forceLogout?.();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export default fetchWithAuth