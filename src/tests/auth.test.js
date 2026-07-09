const { createUser, authenticate } = require('../auth');

function assert(condition, msg) {
  if (!condition) throw new Error(`FAIL: ${msg}`);
  console.log(`PASS: ${msg}`);
}

// Test user creation
const user = createUser('Tobe', 'tobe@test.com', 'password123');
assert(user.name === 'Tobe', 'createUser returns name');
assert(user.email === 'tobe@test.com', 'createUser returns email');

// Test authentication
const authResult = authenticate('tobe@test.com', 'password123');
assert(authResult.success === true, 'authenticate succeeds with correct creds');

const failResult = authenticate('tobe@test.com', 'wrong');
assert(failResult.success === false, 'authenticate fails with wrong password');

console.log('\nAll tests passed ✓');
