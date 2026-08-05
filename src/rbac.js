const ROLES = {
  admin: ['read', 'write', 'delete', 'manage_users'],
  editor: ['read', 'write'],
  viewer: ['read']
};

const userRoles = new Map();

function assignRole(userId, role) {
  if (!ROLES[role]) return { success: false, error: `Unknown role: ${role}` };
  userRoles.set(userId, role);
  return { success: true, userId, role };
}

function checkPermission(userId, permission) {
  const role = userRoles.get(userId) || 'viewer';
  const allowed = ROLES[role]?.includes(permission) || false;
  return { allowed, role, permission };
}

function requirePermission(permission) {
  return (userId) => {
    const result = checkPermission(userId, permission);
    if (!result.allowed) return { authorized: false, error: `Role '${result.role}' lacks '${permission}' permission` };
    return { authorized: true };
  };
}

module.exports = { assignRole, checkPermission, requirePermission, ROLES };
