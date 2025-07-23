import axios from "./api";

export interface BannerData {
  title: string;
  image: string;
}

// Banner da página Serviços
export const getBanner = async (): Promise<BannerData> => {
  const res = await axios.get("/banner/services");
  return res.data;
};

export const updateBanner = async (data: BannerData): Promise<void> => {
  await axios.put("/banner/services", data);
};

// Banner da página Sobre Nós
export const getAboutBanner = async (): Promise<BannerData> => {
  const res = await axios.get("/banner/about-us");
  return res.data;
};

export const updateAboutBanner = async (data: BannerData): Promise<void> => {
  await axios.put("/banner/about-us", data);
};

// ✅ Banner da página Login
export const getLoginBanner = async (): Promise<BannerData> => {
  const res = await axios.get("/banner/login");
  return res.data;
};

export const updateLoginBanner = async (data: BannerData): Promise<void> => {
  await axios.put("/banner/login", data);
};

// ✅ Banner da página Registo
export const getRegisterBanner = async (): Promise<BannerData> => {
  const res = await axios.get("/banner/register");
  return res.data;
};

export const updateRegisterBanner = async (data: BannerData): Promise<void> => {
  await axios.put("/banner/register", data);
};
