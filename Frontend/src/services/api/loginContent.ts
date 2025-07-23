import api from "./api";

export const getLoginContent = async () => {
  const res = await api.get("/login-content");
  return res.data;
};

export const updateLoginContent = async (data: Record<string, string>) => {
  const res = await api.put("/login-content", data);
  return res.data;
};
