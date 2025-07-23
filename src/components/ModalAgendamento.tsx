import { useEffect, useState } from "react";
import {
  criarAgendamento,
  atualizarAgendamento,
  apagarAgendamento,
} from "../services/api/agendamento";
import { getColaboradores } from "../services/api/utilizador";
import { getServicos } from "../services/api/servico";
import { toast } from "react-toastify";

interface Props {
  visible: boolean;
  mode: "create" | "edit";
  item?: any;
  onClose: () => void;
  onSave: () => void;
  customStyle?: React.CSSProperties;
}

const ModalAgendamento = ({
  visible,
  mode,
  item,
  onClose,
  onSave,
  customStyle = {},
}: Props) => {
  const tipoUtilizador = localStorage.getItem("tipo");
  const clienteData = localStorage.getItem("clienteLogado");
  const cliente = clienteData ? JSON.parse(clienteData) : null;

  const [form, setForm] = useState({
    data_hora: "",
    colaborador_id: "",
    servico_id: "",
    cliente_id: cliente?.id?.toString() || "",
    cliente_nome: cliente?.nome || "",
  });

  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resColaboradores, resServicos] = await Promise.all([
          getColaboradores(),
          getServicos(),
        ]);
        setColaboradores(resColaboradores?.data ?? resColaboradores ?? []);
        setServicos(resServicos?.data ?? resServicos ?? []);
      } catch {
        toast.error("Erro ao carregar dados.");
      }
    };
    carregarDados();
  }, []);

  useEffect(() => {
    if (mode === "edit" && item) {
      setForm({
        data_hora: item.data_hora?.slice(0, 16) || "",
        colaborador_id: item.colaborador?.id?.toString() || "",
        servico_id: item.servico?.id?.toString() || "",
        cliente_id: item.cliente?.id?.toString() || cliente?.id?.toString() || "",
        cliente_nome: item.cliente?.nome || cliente?.nome || "",
      });
    }
  }, [item, mode]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.cliente_id && tipoUtilizador === "cliente") {
      toast.error("Cliente não autenticado.");
      return;
    }

    const payload: any = {
      data_hora: form.data_hora,
      colaborador_id: Number(form.colaborador_id),
      servico_id: Number(form.servico_id),
      estado: "pendente",
      coluna: "Semana",
    };

    if (mode === "create") {
      payload.cliente_id = Number(form.cliente_id);
    }

    try {
      if (mode === "create") {
        await criarAgendamento(payload);
        toast.success("Agendamento criado com sucesso!");
      } else {
        await atualizarAgendamento(item.id, payload);
        toast.success("Agendamento atualizado com sucesso!");
      }

      onSave();
      onClose();
    } catch (error: any) {
      console.error("Erro ao guardar:", error);
      if (error.response?.data?.detalhes) {
        error.response.data.detalhes.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Erro ao guardar agendamento.");
      }
    }
  };

  const handleDelete = async () => {
    if (!item?.id) return;
    if (!confirm("Tem certeza que deseja apagar este agendamento?")) return;

    try {
      await apagarAgendamento(item.id);
      toast.success("Agendamento apagado com sucesso!");
      onSave();
      onClose();
    } catch {
      toast.error("Erro ao apagar agendamento.");
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}></div>

      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog" style={{ ...customStyle, marginTop: "180px" }}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {mode === "create" ? "Novo Agendamento" : "Ver/Editar Agendamento"}
                </h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <label>Data/Hora:</label>
                <input
                  type="datetime-local"
                  className="form-control mb-2"
                  value={form.data_hora}
                  onChange={(e) => setForm({ ...form, data_hora: e.target.value })}
                  required
                />

                <label>Colaborador:</label>
                <select
                  className="form-control mb-2"
                  value={form.colaborador_id}
                  onChange={(e) => setForm({ ...form, colaborador_id: e.target.value })}
                  required
                >
                  <option value="">-- Seleciona um colaborador --</option>
                  {colaboradores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </select>

                <label>Serviço:</label>
                <select
                  className="form-control mb-2"
                  value={form.servico_id}
                  onChange={(e) => setForm({ ...form, servico_id: e.target.value })}
                  required
                >
                  <option value="">-- Seleciona um serviço --</option>
                  {servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>

                <input type="hidden" name="cliente_id" value={form.cliente_id} />
                <input type="hidden" name="cliente_nome" value={form.cliente_nome} />
              </div>

              <div className="modal-footer d-flex justify-content-between">
                {mode === "edit" && tipoUtilizador !== "studio" && (
                  <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>
                    🗑️ Apagar
                  </button>
                )}
                <div>
                  <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                    Cancelar
                  </button>
                  {tipoUtilizador !== "studio" && (
                    <button type="submit" className="btn btn-primary">
                      Guardar
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAgendamento;
