const store = new Map();

function set(key, value, ttlMs = 60000) {
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return { cached: true, key };
}

function get(key) {
  const entry = store.get(key);
  if (!entry) return { hit: false, value: null };
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { hit: false, value: null, expired: true };
  }
  return { hit: true, value: entry.value };
}

function clear() {
  store.clear();
  return { cleared: true };
}

module.exports = { set, get, clear };
