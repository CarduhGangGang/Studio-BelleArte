import { useEffect, useState } from "react";

interface FiltroControloProps {
  filtroData: string;
  setFiltroData: (val: string) => void;
  colaboradorId: number | null;
  setColaboradorId: (val: number | null) => void;
}

const FiltroControlo = ({
  filtroData,
  setFiltroData,
  colaboradorId,
  setColaboradorId,
}: FiltroControloProps) => {
  const [colaboradores, setColaboradores] = useState<{ id: number; nome: string }[]>([]);
  const [utilizador, setUtilizador] = useState<{ id: number; nome: string } | null>(null);

  useEffect(() => {
    const fetchColaboradores = async () => {
      try {
        const res = await fetch("/api/utilizador?role=2", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        setColaboradores(data);
      } catch (error) {
        console.error("Erro ao buscar colaboradores", error);
      }
    };

    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setUtilizador(user);
      setColaboradorId(user.id);
    }

    fetchColaboradores();
  }, [setColaboradorId]);

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex gap-1">
        {["Hoje", "Semana", "Dia"].map((label) => (
          <button
            key={label}
            className={`btn btn-sm ${filtroData === label ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFiltroData(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <select
        className="form-select form-select-sm"
        value={colaboradorId ?? ""}
        onChange={(e) =>
          setColaboradorId(e.target.value ? parseInt(e.target.value) : null)
        }
      >
        <option value="">Todos os Colaboradores</option>
        {colaboradores.map((colab) => (
          <option key={colab.id} value={colab.id}>
            {colab.nome}
            {utilizador?.id === colab.id ? " (Você)" : ""}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroControlo;