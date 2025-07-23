import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  getTodosHolidays,
  adicionarHoliday,
  atualizarHoliday,
  removerHoliday,
} from "../services/api/holiday";
import { getColaboradores } from "../services/api/utilizador";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const Ferias = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = user?.role === 1;

  const [holidays, setHolidays] = useState([]);
  const [colaboradores, setColaboradores] = useState([]);
  const [filtroColaborador, setFiltroColaborador] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editHoliday, setEditHoliday] = useState(null);
  const [form, setForm] = useState({
    colaborador_id: "",
    data_inicio: "",
    data_fim: "",
  });

  useEffect(() => {
    carregar();
  }, []);

  const carregar = async () => {
    try {
      const res = await getTodosHolidays();
      const colabs = await getColaboradores();
      setColaboradores(colabs.data);
      setHolidays(res.data);
    } catch {
      toast.error("Erro ao carregar férias.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { colaborador_id, data_inicio, data_fim } = form;

    if (!colaborador_id || !data_inicio || !data_fim) {
      toast.warn("Preencha todos os campos.");
      return;
    }

    const novaSemana = dayjs(data_inicio).isoWeek();
    const colabsNaSemana = holidays.filter((h) => {
      return (
        h.tipo === "ferias" &&
        dayjs(h.data_inicio).isoWeek() === novaSemana &&
        h.colaborador_id !== Number(colaborador_id)
      );
    });

    if (!editHoliday && colabsNaSemana.length >= 2 && !isAdmin) {
      toast.error("Já existem dois colaboradores de férias nesta semana.");
      return;
    }

    try {
      const payload = {
        colaborador_id: Number(colaborador_id),
        tipo: "ferias",
        data_inicio,
        data_fim,
      };

      if (editHoliday) {
        await atualizarHoliday(editHoliday.id, payload);
        toast.success("Férias atualizadas!");
      } else {
        await adicionarHoliday(payload);
        toast.success("Férias adicionadas!");
      }

      setShowModal(false);
      setEditHoliday(null);
      resetForm();
      carregar();
    } catch {
      toast.error("Erro ao guardar férias.");
    }
  };

  const resetForm = () => {
    setForm({ colaborador_id: "", data_inicio: "", data_fim: "" });
  };

  const handleEdit = (h) => {
    setEditHoliday(h);
    setForm({
      colaborador_id: h.colaborador_id.toString(),
      data_inicio: h.data_inicio,
      data_fim: h.data_fim,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Deseja apagar estas férias?")) return;
    try {
      await removerHoliday(id);
      toast.success("Férias removidas!");
      carregar();
    } catch {
      toast.error("Erro ao apagar férias.");
    }
  };

  const holidaysFiltradas = filtroColaborador
    ? holidays.filter((h) => h.colaborador_id === Number(filtroColaborador))
    : holidays;

  return (
    <div className="container mt-4">
      <h2 className="h5 fw-bold mb-4">🌴 Gestão de Férias</h2>

      <div className="d-flex gap-2 mb-3">
        <Form.Select
          value={filtroColaborador}
          onChange={(e) => setFiltroColaborador(e.target.value)}
        >
          <option value="">Filtrar por colaborador</option>
          {colaboradores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </Form.Select>

        {isAdmin && (
          <Button onClick={() => setShowModal(true)} variant="primary">
            + Marcar Férias
          </Button>
        )}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Colaborador</th>
            <th>Data Início</th>
            <th>Data Fim</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {holidaysFiltradas.map((h) => (
            <tr key={h.id}>
              <td>{h.colaborador?.nome || "Desconhecido"}</td>
              <td>{h.data_inicio}</td>
              <td>{h.data_fim}</td>
              <td>
                {isAdmin && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleEdit(h)}
                      variant="outline-primary"
                    >
                      Editar
                    </Button>{" "}
                    <Button
                      size="sm"
                      onClick={() => handleDelete(h.id)}
                      variant="outline-danger"
                    >
                      Remover
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isAdmin && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editHoliday ? "Editar Férias" : "Marcar Férias"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label>Colaborador</Form.Label>
                <Form.Select
                  value={form.colaborador_id}
                  onChange={(e) =>
                    setForm({ ...form, colaborador_id: e.target.value })
                  }
                  required
                >
                  <option value="">Seleciona um colaborador</option>
                  {colaboradores.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nome}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Data de Início</Form.Label>
                <Form.Control
                  type="date"
                  value={form.data_inicio}
                  onChange={(e) =>
                    setForm({ ...form, data_inicio: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Data de Fim</Form.Label>
                <Form.Control
                  type="date"
                  value={form.data_fim}
                  onChange={(e) =>
                    setForm({ ...form, data_fim: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                {editHoliday ? "Atualizar" : "Guardar"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default Ferias;
