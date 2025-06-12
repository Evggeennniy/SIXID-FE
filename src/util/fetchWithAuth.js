
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

const fetchWithAuth = async (
  url,
  options = {},
  updateTokens,
  forceLogout
) => {
  const access = Cookies.get('access');
  const refresh = Cookies.get('refresh');

  const originalBody = options.body; // store body to re-use

  const applyToken = (token) => ({
    ...options,
    body: originalBody, // reattach body
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  const retryRequest = async (token) => {
    const opts = applyToken(token);
    return await fetch(url, opts);
  };

  // First attempt
  let response = await retryRequest(access);

  if (response.status !== 401) return response;

  if (!refresh) {
    forceLogout?.();
    throw new Error('Unauthorized: No refresh token');
  }

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

    if (updateTokens) {
      await updateTokens(newAccessToken);
    }

    onRefreshed(newAccessToken);

    return await retryRequest(newAccessToken);
  } catch (err) {
    forceLogout?.();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export default fetchWithAuth;

