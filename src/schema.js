const TYPES = {
  string: v => typeof v === 'string',
  number: v => typeof v === 'number',
  boolean: v => typeof v === 'boolean',
  array: v => Array.isArray(v),
  object: v => typeof v === 'object' && v !== null && !Array.isArray(v),
  null: v => v === null,
};

function validate(data, schema) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !(field in data)) {
      errors.push(`Missing required field: ${field}`);
      continue;
    }
    if (field in data && rules.type && !TYPES[rules.type]?.(data[field])) {
      errors.push(`Field ${field} expected ${rules.type}`);
    }
    if (field in data && rules.minLength && data[field].length < rules.minLength) {
      errors.push(`Field ${field} shorter than ${rules.minLength}`);
    }
    if (field in data && rules.max && data[field] > rules.max) {
      errors.push(`Field ${field} exceeds max ${rules.max}`);
    }
  }
  return errors.length ? { valid: false, errors } : { valid: true };
}

module.exports = { validate, TYPES };
