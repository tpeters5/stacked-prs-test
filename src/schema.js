const TYPES = { string: v => typeof v === 'string', number: v => typeof v === 'number', boolean: v => typeof v === 'boolean' };
function validate(data, schema) {
  const errors = [];
  for (const [field, rules] of Object.entries(schema)) {
    if (rules.required && !(field in data)) errors.push(field + ' is required');
    if (field in data && rules.type && !TYPES[rules.type]?.(data[field])) errors.push(field + ' must be type ' + rules.type);
  }
  return errors.length ? { valid: false, errors } : { valid: true };
}
module.exports = { validate, TYPES };
