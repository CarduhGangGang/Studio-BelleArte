import { createContext, useContext, useState, ReactNode } from "react";

interface UltimoAgendamento {
  data_hora: string;
  servico: { nome: string };
  colaborador: { nome: string };
  cliente?: { nome: string };
  preco?: number;
}

interface AgendamentoContextType {
  ultimoAgendamento: UltimoAgendamento | null;
  setUltimoAgendamento: (a: UltimoAgendamento | null) => void;
}

const AgendamentoContext = createContext<AgendamentoContextType | undefined>(undefined);

export const AgendamentoProvider = ({ children }: { children: ReactNode }) => {
  const [ultimoAgendamento, setUltimoAgendamento] = useState<UltimoAgendamento | null>(() => {
    const stored = localStorage.getItem("ultimoAgendamento");
    return stored ? JSON.parse(stored) : null;
  });

  return (
    <AgendamentoContext.Provider value={{ ultimoAgendamento, setUltimoAgendamento }}>
      {children}
    </AgendamentoContext.Provider>
  );
};

export const useAgendamento = () => {
  const context = useContext(AgendamentoContext);
  if (!context) throw new Error("useAgendamento deve estar dentro do AgendamentoProvider");
  return context;
};
