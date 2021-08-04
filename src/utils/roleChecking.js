export function isAdmin(current_user) {
  if (current_user) {
    return current_user.type === "organization";
  } else {
    return false;
  }
}

export function isIntern(current_user) {
  if (current_user) {
    return current_user.type === "intern";
  } else {
    return false;
  }
}

export function isSymbaAdmin(current_user) {
  if (current_user) {
    return current_user.type === "symbaAdmin";
  } else {
    return false;
  }
}

export function isManager(current_user) {
  if (current_user) {
    return current_user.type === "manager";
  } else {
    return false;
  }
}

export function isAlumni(current_user) {
  if (current_user) {
    return current_user.type === "alumni";
  } else {
    return false;
  }
}

export function isUser(current_user) {
  if (current_user) {
    return current_user.type === "user";
  } else {
    return false;
  }
}

export function isSuperAdmin(current_user) {
  if (current_user) {
    return current_user.type === "superadmin";
  } else {
    return false;
  }
}
