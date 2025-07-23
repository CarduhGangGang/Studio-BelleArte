import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { getHeader, updateHeader as apiUpdateHeader, HeaderData } from "../services/api/header";

type HeaderContextType = {
  header: HeaderData | null;
  updateHeader: (data: HeaderData) => Promise<void>;
};

const HeaderContext = createContext<HeaderContextType | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [header, setHeader] = useState<HeaderData | null>(null);

  useEffect(() => {
    getHeader()
      .then(setHeader)
      .catch(() =>
        setHeader({
          phone: "+351 918 283 283",
          address: "Rua das Amoreiras, nº 145, 4º Esq., 1250-096 Lisboa, Portugal",
        })
      );
  }, []);

  const updateHeader = async (data: HeaderData) => {
    await apiUpdateHeader(data);
    setHeader(data); // Atualiza no estado/contexto imediatamente
  };

  return (
    <HeaderContext.Provider value={{ header, updateHeader }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = (): HeaderContextType => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeader must be used within a HeaderProvider");
  }
  return context;
};
