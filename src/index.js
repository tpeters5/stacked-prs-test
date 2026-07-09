const { authenticate, createUser } = require('./auth');

const app = {
  login: (email, password) => {
    const result = authenticate(email, password);
    console.log(result.success ? `Welcome, ${result.user.name}!` : `Login failed: ${result.error}`);
    return result;
  },
  register: (name, email, password) => {
    const user = createUser(name, email, password);
    console.log(`Registered: ${user.name} (${user.email})`);
    return user;
  }
};

module.exports = app;
