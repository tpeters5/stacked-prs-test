const counters = new Map();
const timers = new Map();

function increment(name, amount = 1) {
  const current = counters.get(name) || 0;
  counters.set(name, current + amount);
  return { metric: name, value: current + amount };
}

function startTimer(name) {
  const start = process.hrtime.bigint();
  timers.set(name, start);
  return { metric: name, started: true };
}

function stopTimer(name) {
  const start = timers.get(name);
  if (!start) return { metric: name, error: 'Timer not started' };
  const elapsed = Number(process.hrtime.bigint() - start) / 1e6;
  timers.delete(name);
  return { metric: name, durationMs: elapsed.toFixed(2) };
}

function snapshot() {
  return {
    counters: Object.fromEntries(counters),
    activeTimers: Array.from(timers.keys()),
    collectedAt: new Date().toISOString()
  };
}

module.exports = { increment, startTimer, stopTimer, snapshot };
