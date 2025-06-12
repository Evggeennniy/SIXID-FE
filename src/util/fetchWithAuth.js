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

  // 🧠 Сохраняем тело запроса, чтобы оно не "потерялось" при повторном использовании
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
    console.log('🔁 Retrying request with token:', token);
    return await fetch(url, applyToken(token));
  };

  // Если кто-то уже обновляет токен — ждем его
  if (isRefreshing) {
    console.log('⏳ Waiting for token refresh to finish...');
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

  // 🟡 Первый запрос с текущим access токеном
  let response = await retryRequest(access);

  if (response.status !== 401) {
    return response;
  }

  // ❌ Если токен протух — пробуем refresh
  if (!refresh) {
    console.warn('❌ No refresh token available');
    forceLogout?.();
    throw new Error('Unauthorized: No refresh token');
  }

  isRefreshing = true;

  try {
    console.log('🔄 Attempting to refresh token...');
    const refreshResponse = await fetch('/api/auth/token/refresh/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshResponse.ok) {
      console.warn('❌ Refresh token request failed');
      forceLogout?.();
      throw new Error('Token refresh failed');
    }

    const { access: newAccessToken } = await refreshResponse.json();

    if (!newAccessToken) {
      console.warn('❌ No access token returned from refresh');
      forceLogout?.();
      throw new Error('No new access token returned');
    }

    Cookies.set('access', newAccessToken);

    if (updateTokens) {
      await updateTokens(newAccessToken);
    }

    // 🔔 Оповещаем всех, кто ждал обновления токена
    onRefreshed(newAccessToken);

    // 🔁 Повтор запроса
    return await retryRequest(newAccessToken);
  } catch (err) {
    forceLogout?.();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export default fetchWithAuth;
