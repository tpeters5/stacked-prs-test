const events = [];

function track(name, props = {}) {
  const event = {
    name,
    props,
    at: new Date().toISOString(),
  };
  events.push(event);
  return event;
}

function summary() {
  const counts = {};
  for (const e of events) counts[e.name] = (counts[e.name] || 0) + 1;
  return { total: events.length, counts };
}

function recent(limit = 10) {
  return events.slice(-limit);
}

module.exports = { track, summary, recent };
