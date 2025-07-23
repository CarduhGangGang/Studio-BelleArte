export const loginUser = (user: any, role: "admin" | "studio" | "cliente") => {
  const roleKey = `${role}Role`;
  const userKey = `${role}Logado`;

    localStorage.setItem("role", getRoleCode(role).toString());
  localStorage.setItem("tipo", role); 
  localStorage.setItem(roleKey, getRoleCode(role).toString());
  localStorage.setItem(userKey, JSON.stringify(user));
};

export const logoutUser = (role: "admin" | "studio" | "cliente") => {
  localStorage.removeItem("role"); 
  localStorage.removeItem(`${role}Role`);
  localStorage.removeItem(`${role}Logado`);
};

export const getRoleCode = (role: "admin" | "studio" | "cliente") => {
  switch (role) {
    case "admin": return 1;
    case "studio": return 2;
    case "cliente": return 3;
    default: return 0;
  }
};

export const isLoggedIn = (role: "admin" | "studio" | "cliente") => {
  return !!localStorage.getItem(`${role}Role`);
};

export const getUserData = (role: "admin" | "studio" | "cliente") => {
  const user = localStorage.getItem(`${role}Logado`);
  return user ? JSON.parse(user) : null;
};
