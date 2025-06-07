

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
  access,
  refresh,
  updateTokens,
  forceLogout
) => {
  const applyToken = (token) => ({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  // Initial request
  let response = await fetch(url, applyToken(access));
  if (response.status !== 401) return response;

  // Unauthorized: try refresh
  if (!refresh) {
    forceLogout?.();
    throw new Error("Unauthorized: No refresh token");
  }

  // Already refreshing? Wait
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      subscribeTokenRefresh(async (newAccessToken) => {
        try {
          const retryResponse = await fetch(url, applyToken(newAccessToken));
          resolve(retryResponse);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  // Start refresh
  isRefreshing = true;
  try {
    const refreshResponse = await fetch("/api/auth/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshResponse.ok) {
      forceLogout?.();
      throw new Error("Token refresh failed");
    }

    const { access: newAccessToken } = await refreshResponse.json();

    // Update app state (token) and notify subscribers
    if (updateTokens) {
      await updateTokens(newAccessToken); // works with async or sync
    }
    onRefreshed(newAccessToken);

    // Retry original request with new token
    return await fetch(url, applyToken(newAccessToken));
  } catch (err) {
    forceLogout?.();
    throw err;
  } finally {
    isRefreshing = false;
  }
};

export default fetchWithAuth;
