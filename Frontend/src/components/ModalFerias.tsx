import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { adicionarHoliday, atualizarHoliday } from "../services/api/holiday";
import { toast } from "react-toastify";

interface Props {
  visible: boolean;
  item?: any;
  onClose: () => void;
  onSave: () => void;
}

const ModalFerias = ({ visible, item, onClose, onSave }: Props) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [form, setForm] = useState({
    data_inicio: "",
    data_fim: "",
  });

  useEffect(() => {
    if (item) {
      setForm({
        data_inicio: item.data_inicio || "",
        data_fim: item.data_fim || "",
      });
    } else {
      setForm({
        data_inicio: "",
        data_fim: "",
      });
    }
  }, [item]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { data_inicio, data_fim } = form;

    if (!data_inicio || !data_fim) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    const payload = {
      colaborador_id: Number(user.id),
      tipo: "ferias",
      data_inicio,
      data_fim,
    };

    try {
      if (item) {
        await atualizarHoliday(item.id, payload);
        toast.success("Férias atualizadas!");
      } else {
        await adicionarHoliday(payload);
        toast.success("Férias adicionadas!");
      }

      onSave();
      onClose();
    } catch {
      toast.error("Erro ao guardar as férias.");
    }
  };

  if (!visible) return null;

  return (
    <>
      <div className="modal-backdrop show" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog" style={{ marginTop: "180px" }}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{item ? "Editar Férias" : "Marcar Férias"}</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>

              <div className="modal-body">
                <Form.Group className="mb-2">
                  <Form.Label>Data de Início</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.data_inicio}
                    onChange={(e) => setForm({ ...form, data_inicio: e.target.value })}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Data de Fim</Form.Label>
                  <Form.Control
                    type="date"
                    value={form.data_fim}
                    onChange={(e) => setForm({ ...form, data_fim: e.target.value })}
                    required
                  />
                </Form.Group>
              </div>

              <div className="modal-footer d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {item ? "Atualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFerias;
