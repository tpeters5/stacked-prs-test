const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
let currentLevel = LOG_LEVELS.info;

function log(level, message, meta = {}) {
  if (LOG_LEVELS[level] < currentLevel) return;
  const entry = {
    timestamp: new Date().toISOString(),
    level: level.toUpperCase(),
    message,
    ...meta
  };
  const output = `[${entry.timestamp}] ${entry.level}: ${entry.message}`;
  if (Object.keys(meta).length) console.log(output, JSON.stringify(meta));
  else console.log(output);
  return entry;
}

const logger = {
  debug: (msg, meta) => log('debug', msg, meta),
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  setLevel: (level) => { currentLevel = LOG_LEVELS[level] || 1; }
};

module.exports = logger;
