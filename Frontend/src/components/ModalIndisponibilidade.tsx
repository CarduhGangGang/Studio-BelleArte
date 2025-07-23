import { useEffect, useState } from "react";
import {
  criarIndisponibilidade,
  atualizarIndisponibilidade,
  apagarIndisponibilidade,
} from "../services/api/indisponibilidade";
import { toast } from "react-toastify";

interface Props {
  visible: boolean;
  data_hora: string;
  motivo: string;
  id?: number | null;
  onClose: () => void;
  onSave: () => void;
}

const ModalIndisponibilidade = ({
  visible,
  data_hora,
  motivo,
  id,
  onClose,
  onSave,
}: Props) => {
  const [form, setForm] = useState({
    data_hora: "",
    motivo: "",
  });

  const user = (() => {
    try {
      const userString = localStorage.getItem("user");
      return userString ? JSON.parse(userString) : null;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (visible) {
      setForm({
        data_hora: data_hora || "",
        motivo: motivo || "",
      });
    }
  }, [visible, data_hora, motivo, id]);

  if (!visible) return null;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!user || !user.id) {
      toast.error("⚠️ Utilizador não autenticado.");
      return;
    }

    try {
      const payload = {
        ...form,
        colaborador_id: user.id,
        tipo: "indisponibilidade", // <-- ESSENCIAL PARA APARECER NA AGENDA
      };

      if (id) {
        await atualizarIndisponibilidade(id, payload);
        toast.success("✅ Indisponibilidade atualizada!");
      } else {
        await criarIndisponibilidade(payload);
        toast.success("✅ Indisponibilidade criada!");
      }

      onSave();   // Atualiza a agenda
      onClose();  // Fecha o modal
    } catch (err) {
      console.error("Erro ao guardar:", err);
      toast.error("❌ Erro ao guardar indisponibilidade.");
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmar = window.confirm("Deseja mesmo apagar esta indisponibilidade?");
    if (!confirmar) return;

    try {
      await apagarIndisponibilidade(id);
      toast.success("🗑️ Indisponibilidade apagada!");
      onSave();
      onClose();
    } catch (err) {
      toast.error("❌ Erro ao apagar indisponibilidade.");
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog" style={{ marginTop: "180px" }}>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header bg-warning">
              <h5 className="modal-title">
                {id ? "Editar Indisponibilidade" : "Bloquear Horário"}
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

              <label>Motivo:</label>
              <input
                type="text"
                className="form-control mb-2"
                value={form.motivo}
                onChange={(e) => setForm({ ...form, motivo: e.target.value })}
                required
              />
            </div>

            <div className="modal-footer d-flex justify-content-between">
              {id && (
                <button type="button" className="btn btn-outline-danger" onClick={handleDelete}>
                  🗑️ Apagar
                </button>
              )}
              <div>
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Bloquear
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalIndisponibilidade;
