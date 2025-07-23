import api from './api';

export const getRegisterContent = async () => {
  const res = await api.get('/register-content');
  return res.data;
};

export const updateRegisterContent = async (data: Record<string, string>) => {
  const res = await api.put('/register-content', data);
  return res.data;
};