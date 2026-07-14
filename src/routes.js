const { authenticate, createUser } = require('./auth');
const { validateEmail, validatePassword, validateRequired } = require('./validation');
const { createSession, destroySession } = require('./session');
const logger = require('./logger');

const routes = {
  'POST /register': (body) => {
    const reqCheck = validateRequired(['name', 'email', 'password'], body);
    if (!reqCheck.valid) return { status: 400, body: reqCheck };
    const emailCheck = validateEmail(body.email);
    if (!emailCheck.valid) return { status: 400, body: emailCheck };
    const pwCheck = validatePassword(body.password);
    if (!pwCheck.valid) return { status: 400, body: pwCheck };
    const user = createUser(body.name, body.email, body.password);
    logger.info('User registered', { userId: user.id });
    return { status: 201, body: user };
  },
  'POST /login': (body) => {
    const result = authenticate(body.email, body.password);
    if (!result.success) return { status: 401, body: result };
    const session = createSession(result.user.id);
    logger.info('User logged in', { userId: result.user.id });
    return { status: 200, body: { ...result.user, token: session.token } };
  },
  'POST /logout': (body) => {
    destroySession(body.token);
    logger.info('User logged out');
    return { status: 200, body: { message: 'Logged out' } };
  }
};

module.exports = routes;
