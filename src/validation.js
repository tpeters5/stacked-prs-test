function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return { valid: false, error: 'Invalid email format' };
  return { valid: true };
}

function validatePassword(password) {
  if (!password || password.length < 8) return { valid: false, error: 'Password must be at least 8 characters' };
  if (!/[A-Z]/.test(password)) return { valid: false, error: 'Password must contain an uppercase letter' };
  if (!/[0-9]/.test(password)) return { valid: false, error: 'Password must contain a number' };
  return { valid: true };
}

function validateRequired(fields, body) {
  const missing = fields.filter(f => !body[f]);
  if (missing.length) return { valid: false, error: `Missing fields: ${missing.join(', ')}` };
  return { valid: true };
}

module.exports = { validateEmail, validatePassword, validateRequired };
