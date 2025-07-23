import { useEffect, useState } from "react";
import {
  getIndisponibilidades,
  apagarIndisponibilidade,
} from "../services/api/indisponibilidade";
import ModalIndisponibilidade from "./ModalIndisponibilidade";
import { toast } from "react-toastify";

interface Indisponibilidade {
  id: number;
  data_hora: string;
  motivo: string;
  colaborador_id: number;
}

const Indisponibilidades = () => {
  const [indisponibilidades, setIndisponibilidades] = useState<Indisponibilidade[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Indisponibilidade | null>(null);

  const carregarIndisponibilidades = async () => {
    try {
      const res = await getIndisponibilidades();
      setIndisponibilidades(res.data);
    } catch (err) {
      toast.error("Erro ao carregar indisponibilidades");
    }
  };

  useEffect(() => {
    carregarIndisponibilidades();
  }, []);

  const abrirModal = () => {
    setEditingItem(null);
    setModalVisible(true);
  };

  const editar = (item: Indisponibilidade) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  const remover = async (id: number) => {
    const confirmar = window.confirm("Tem a certeza que deseja remover?");
    if (!confirmar) return;

    try {
      await apagarIndisponibilidade(id);
      toast.success("Indisponibilidade removida!");
      carregarIndisponibilidades();
    } catch {
      toast.error("Erro ao remover");
    }
  };

  return (
    <div className="container my-4 d-flex justify-content-center">
      <div
        className="bg-white rounded-4 shadow p-4 w-100"
        style={{ maxWidth: "960px" }} // <- aumentada para desktop
      >
        {/* Cabeçalho responsivo */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-3">
          <h2 className="h5 fw-semibold m-0">⛔ Indisponibilidades</h2>
          <button className="btn btn-danger" onClick={abrirModal}>
            + Indisponível
          </button>
        </div>

        {indisponibilidades.length === 0 ? (
          <p className="text-muted text-center">Nenhuma indisponibilidade.</p>
        ) : (
          <ul className="list-group">
            {indisponibilidades.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2"
              >
                <span className="w-100">
                  {new Date(item.data_hora).toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  – {item.motivo}
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => editar(item)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => remover(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <ModalIndisponibilidade
          visible={modalVisible}
          data_hora={editingItem?.data_hora || ""}
          motivo={editingItem?.motivo || ""}
          id={editingItem?.id || null}
          onClose={() => setModalVisible(false)}
          onSave={carregarIndisponibilidades}
        />
      </div>
    </div>
  );
};

export default Indisponibilidades;
