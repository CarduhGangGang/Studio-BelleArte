import { useEffect, useState } from "react";
import { getHorarios, salvarHorarios } from "../services/api/horario";
import { toast } from "react-toastify";

interface Horario {
  id?: number;
  dia: string;
  entrada: string;
  saida: string;
}

const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

const Horarios = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [editando, setEditando] = useState(false);
  const [bloqueado, setBloqueado] = useState(false);
  const [user, setUser] = useState<null | { id: number; role: number }>(null);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsed = JSON.parse(userData);
        setUser(parsed);
      } else {
        toast.error("Utilizador não encontrado.");
      }
    } catch {
      toast.error("Erro ao carregar utilizador.");
    }
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const carregar = async () => {
      try {
        const res = await getHorarios(Number(user.id));
        const ordem = [...diasSemana];

        if (res.data.length > 0) {
          const ordenados = res.data.sort(
            (a: any, b: any) => ordem.indexOf(a.dia) - ordem.indexOf(b.dia)
          );
          setHorarios(ordenados);
          setBloqueado(user.role !== 1); // 🔓 Apenas bloqueia se não for admin
        } else {
          const novos: Horario[] = ordem.map((dia) => ({
            dia,
            entrada: "09:00",
            saida: dia === "Sexta" ? "17:00" : "18:00",
          }));
          setHorarios(novos);
          setEditando(true);
        }
      } catch {
        toast.error("Erro ao carregar horários.");
      }
    };

    carregar();
  }, [user]);

  const handleChange = (index: number, campo: keyof Horario, valor: string) => {
    const copia = [...horarios];
    copia[index][campo] = valor;
    setHorarios(copia);
  };

  const guardar = async () => {
    if (!user?.id) {
      toast.error("Utilizador não autenticado.");
      return;
    }

    try {
      await salvarHorarios(Number(user.id), horarios);
      toast.success("Horários guardados com sucesso!");
      setEditando(false);
      setBloqueado(user.role !== 1);
    } catch {
      toast.error("Erro ao guardar horários.");
    }
  };

  const adicionarLinha = () => {
    if (bloqueado) return;

    const diasExistentes = horarios.map((h) => h.dia);
    const diaDisponivel = diasSemana.find((d) => !diasExistentes.includes(d));

    if (!diaDisponivel) {
      toast.info("Todos os dias já foram adicionados.");
      return;
    }

    setHorarios([
      ...horarios,
      { dia: diaDisponivel, entrada: "09:00", saida: "18:00" },
    ]);
    setEditando(true);
  };

  const removerLinha = (index: number) => {
    if (bloqueado) return;

    if (horarios.length <= 1) {
      toast.warn("Tem de haver pelo menos um horário.");
      return;
    }

    const copia = [...horarios];
    const removido = copia.splice(index, 1);
    setHorarios(copia);

    toast.info(`Dia "${removido[0].dia}" removido.`);
  };

  return (
    <div className="bg-white rounded-4 shadow p-4 mb-5">
      <h2 className="h5 fw-semibold mb-3">⏰ Horário de Trabalho</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Dia</th>
            <th>Entrada</th>
            <th>Saída</th>
            {editando && !bloqueado && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {horarios.map((h, idx) => (
            <tr key={idx}>
              <td>{h.dia}</td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={h.entrada}
                  onChange={(e) => handleChange(idx, "entrada", e.target.value)}
                  disabled={bloqueado || !editando}
                />
              </td>
              <td>
                <input
                  type="time"
                  className="form-control"
                  value={h.saida}
                  onChange={(e) => handleChange(idx, "saida", e.target.value)}
                  disabled={bloqueado || !editando}
                />
              </td>
              {editando && !bloqueado && (
                <td>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removerLinha(idx)}
                    title="Remover dia"
                  >
                    🗑️
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex gap-2 mt-3 flex-wrap">
        {!editando && !bloqueado && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setEditando(true)}
          >
            ✏️ Editar Horários
          </button>
        )}

        {editando && !bloqueado && (
          <button type="button" className="btn btn-success" onClick={guardar}>
            💾 Guardar Horários
          </button>
        )}

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={adicionarLinha}
          disabled={
            bloqueado ||
            diasSemana.every((d) => horarios.map((h) => h.dia).includes(d))
          }
        >
          ➕ Adicionar Dia
        </button>
      </div>

      {bloqueado && (
        <div className="alert alert-warning mt-4" role="alert">
          ⚠️ Os horários só podem ser alterados por um administrador.
        </div>
      )}
    </div>
  );
};

export default Horarios;
