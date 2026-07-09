const users = [];

function createUser(name, email, password) {
  const user = { id: Date.now(), name, email, password, createdAt: new Date() };
  users.push(user);
  return { id: user.id, name: user.name, email: user.email };
}

function authenticate(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return { success: false, error: 'Invalid credentials' };
  return { success: true, user: { id: user.id, name: user.name, email: user.email } };
}

module.exports = { createUser, authenticate, getUsers: () => users };
