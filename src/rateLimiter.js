const attempts = new Map();

function rateLimiter(maxAttempts = 5, windowMs = 60000) {
  return (req) => {
    const key = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const now = Date.now();
    const record = attempts.get(key) || { count: 0, resetAt: now + windowMs };

    if (now > record.resetAt) {
      record.count = 0;
      record.resetAt = now + windowMs;
    }

    record.count++;
    attempts.set(key, record);

    if (record.count > maxAttempts) {
      const retryAfter = Math.ceil((record.resetAt - now) / 1000);
      return { allowed: false, retryAfter, error: `Too many requests. Retry in ${retryAfter}s` };
    }
    return { allowed: true, remaining: maxAttempts - record.count };
  };
}

module.exports = { rateLimiter };
