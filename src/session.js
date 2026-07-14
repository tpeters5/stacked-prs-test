const crypto = require('crypto');
const sessions = new Map();

function createSession(userId, ttlMs = 3600000) {
  const token = crypto.randomBytes(32).toString('hex');
  const session = { userId, token, createdAt: Date.now(), expiresAt: Date.now() + ttlMs };
  sessions.set(token, session);
  return { token, expiresAt: session.expiresAt };
}

function getSession(token) {
  const session = sessions.get(token);
  if (!session) return { valid: false, error: 'Session not found' };
  if (Date.now() > session.expiresAt) {
    sessions.delete(token);
    return { valid: false, error: 'Session expired' };
  }
  return { valid: true, userId: session.userId };
}

function destroySession(token) {
  return sessions.delete(token);
}

module.exports = { createSession, getSession, destroySession };
