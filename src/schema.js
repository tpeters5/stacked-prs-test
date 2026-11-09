const TYPES = { string: v => typeof v === 'string', number: v => typeof v === 'number', boolean: v => typeof v === 'boolean', array: v => Array.isArray(v), object: v => typeof v === 'object' && !Array.isArray(v), date: v => v instanceof Date };

function validate(data, schema) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && (data == null || !(field in data))) { errors.push(`${field} is required`); continue; }
    if (field in data && rules.type && !TYPES[rules.type]?.(data[field])) errors.push(`${field} must be type ${rules.type}`);
    if (field in data && rules.minLength && String(data[field]).length < rules.minLength) errors.push(`${field} must be at least ${rules.minLength} chars`);
    if (field in data && rules.max != null && data[field] > rules.max) errors.push(`${field} must be at most ${rules.max}`);
    if (field in data && rules.pattern && !rules.pattern.test(String(data[field]))) errors.push(`${field} does not match pattern`);
  }
  return errors.length ? { valid: false, errors } : { valid: true };
}

module.exports = { validate, TYPES };
