const policies = new Map();
function definePolicy(resource, rules) { policies.set(resource, rules); return { defined: true, resource }; }
function evaluate(user, action, resource) {
  const policy = policies.get(resource);
  if (!policy) return { allowed: false, reason: 'No policy for ' + resource };
  const rule = policy[action];
  return { allowed: typeof rule === 'function' ? rule(user) : !!rule };
}
module.exports = { definePolicy, evaluate };
