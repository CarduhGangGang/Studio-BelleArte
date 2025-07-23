import api from "./api";

export const getBookingPage2Config = async () => {
  const res = await api.get("/booking-page-2-config");
  return res.data;
};

export const updateBookingPage2Config = async (data: any) => {
  const res = await api.put("/booking-page-2-config", data);
  return res.data;
};
