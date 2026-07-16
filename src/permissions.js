const policies = new Map();

function definePolicy(resource, rules) {
  policies.set(resource, rules);
  return { defined: true, resource, ruleCount: Object.keys(rules).length };
}

function evaluate(user, action, resource) {
  const policy = policies.get(resource);
  if (!policy) return { allowed: false, reason: `No policy for ${resource}` };
  const rule = policy[action];
  if (!rule) return { allowed: false, reason: `No rule for ${action} on ${resource}` };
  if (typeof rule === 'function') {
    const result = rule(user);
    return { allowed: result, reason: result ? 'Policy passed' : 'Policy denied' };
  }
  return { allowed: !!rule, reason: rule ? 'Allowed by static rule' : 'Denied by static rule' };
}

function listPolicies() {
  return Array.from(policies.entries()).map(([resource, rules]) => ({ resource, actions: Object.keys(rules) }));
}

module.exports = { definePolicy, evaluate, listPolicies };
