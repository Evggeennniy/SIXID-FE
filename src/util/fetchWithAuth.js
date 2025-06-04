
const fetchWithAuth = async (url, options = {}, access, refresh, updateTokens, forceLogout) => {
  let isRefreshing = false;
  let refreshSubscribers = [];

  const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
  };

  const onRefreshed = (newAccess) => {
    refreshSubscribers.forEach((callback) => callback(newAccess));
    refreshSubscribers = [];
  };

  const authHeaders = access
    ? { Authorization: `Bearer ${access}` }
    : {};

  const fetchOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers,
    },
  };

  const response = await fetch(url, fetchOptions);
  if (response.status !== 401) return response;

  if (!refresh) {
    forceLogout?.();
    throw new Error('Unauthorized: No refresh token');
  }

  if (!isRefreshing) {
    isRefreshing = true;
    try {
      const res = await fetch('/auth/token/refresh/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) throw new Error('Refresh failed');

      const data = await res.json();
      const newAccess = data.access;
      updateTokens?.(newAccess);
      onRefreshed(newAccess);
    } catch (err) {
      forceLogout?.();
      throw err;
    } finally {
      isRefreshing = false;
    }
  }

  return new Promise((resolve, reject) => {
    subscribeTokenRefresh(async (newAccessToken) => {
      try {
        const retryOptions = {
          ...fetchOptions,
          headers: {
            ...fetchOptions.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        const retryResponse = await fetch(url, retryOptions);
        resolve(retryResponse);
      } catch (err) {
        reject(err);
      }
    });
  });
};

export default fetchWithAuth