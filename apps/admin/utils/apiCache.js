const cache = new Map();

export const cachedFetch = async (key, fn, ttl = 60000) => {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && now - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fn();

  cache.set(key, {
    data,
    timestamp: now,
  });

  return data;
};

export const clearCache = (key) => {
  if (key) cache.delete(key);
  else cache.clear();
};
