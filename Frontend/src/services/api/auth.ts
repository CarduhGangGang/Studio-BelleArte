// Login
export const login = (dados: { email: string; password: string }) =>
  api.post("/auth/login", dados); 

// Registo de novo utilizador
export const register = (dados: {
  nome: string;
  email: string;
  password: string;
  role_id: number;
}) => api.post("/auth/register", dados); 
