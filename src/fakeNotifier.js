const inbox = [];

function notify(userId, channel, message) {
  const event = {
    id: `n_${inbox.length + 1}`,
    userId,
    channel,
    message,
    sentAt: new Date().toISOString(),
    status: 'queued',
  };
  inbox.push(event);
  return event;
}

function listForUser(userId) {
  return inbox.filter(e => e.userId === userId);
}

function flush() {
  const count = inbox.length;
  inbox.length = 0;
  return { flushed: count };
}

module.exports = { notify, listForUser, flush };
