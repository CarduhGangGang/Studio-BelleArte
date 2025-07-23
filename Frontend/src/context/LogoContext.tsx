import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type LogoContextType = {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
};

const LogoContext = createContext<LogoContextType | undefined>(undefined);

export const LogoProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrlState] = useState<string>("/uploads/logo-default.png");

  useEffect(() => {
    const saved = localStorage.getItem("logoUrl");
    if (saved) {
      setLogoUrlState(saved);
    }
  }, []);

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);

    // Só salva no localStorage se não for uma imagem base64 local
    if (!url.startsWith("data:image/")) {
      localStorage.setItem("logoUrl", url);
    }
  };

  return (
    <LogoContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => {
  const context = useContext(LogoContext);
  if (!context) {
    throw new Error("useLogo must be used inside LogoProvider");
  }
  return context;
};
