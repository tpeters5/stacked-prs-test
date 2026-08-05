const counters = new Map();
function increment(name, amount = 1) { const val = (counters.get(name) || 0) + amount; counters.set(name, val); return { metric: name, value: val }; }
function snapshot() { return { counters: Object.fromEntries(counters), collectedAt: new Date().toISOString() }; }
module.exports = { increment, snapshot };
