import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ModalAgendamento from "./ModalAgendamento";
import ModalIndisponibilidade from "./ModalIndisponibilidade";
import { toast, ToastContainer } from "react-toastify";
import {
  getAgendamentos,
  apagarAgendamento,
} from "../services/api/agendamento";
import { getColaboradores } from "../services/api/utilizador";
import { getServicos } from "../services/api/service";
import "react-toastify/dist/ReactToastify.css";

const Agenda = () => {
  const location = useLocation();
  const isStudioPage = location.pathname === "/studio";

  const [role, setRole] = useState<number | null>(null);
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [modalIndispVisible, setModalIndispVisible] = useState(false);
  const [semanaAtual, setSemanaAtual] = useState(0);

  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [filtros, setFiltros] = useState({ colaborador: "", servico: "" });

  useEffect(() => {
    fetchAgendamentos();
    fetchDadosFiltro();

    const r = localStorage.getItem("role");
    if (r) setRole(Number(r));
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const res = await getAgendamentos();
      setAgendamentos(res.data);
    } catch {
      toast.error("Erro ao carregar agendamentos");
    }
  };

  const fetchDadosFiltro = async () => {
    try {
      const [colab, s] = await Promise.all([
        getColaboradores(),
        getServicos(),
      ]);
      setColaboradores(colab.data);
      setServicos(s.data);
    } catch {
      toast.error("Erro ao carregar filtros");
    }
  };

  const calcularSemana = (index: number) => {
    const hoje = new Date();
    const base = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    base.setDate(base.getDate() + index * 7);
    const dias: Date[] = [];
    const offset = base.getDay() === 0 ? 1 : 1 - base.getDay();
    base.setDate(base.getDate() + offset);
    for (let i = 0; i < 5; i++) {
      const dia = new Date(base);
      dia.setDate(base.getDate() + i);
      dias.push(dia);
    }
    return dias;
  };

  const semanaDias = calcularSemana(semanaAtual);

  const agendamentosFiltrados = agendamentos.filter((ag) => {
    const colaboradorMatch = !filtros.colaborador || ag.colaborador?.id === Number(filtros.colaborador);
    const servicoMatch = !filtros.servico || ag.servico?.id === Number(filtros.servico);
    return colaboradorMatch && servicoMatch;
  });

  const handleDelete = async (id: number) => {
    try {
      await apagarAgendamento(id);
      fetchAgendamentos();
    } catch {
      toast.error("Erro ao apagar agendamento");
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setModalVisible(true);
  };

  return (
    <div className="container mt-4">
      <ToastContainer position="bottom-right" />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📅 Agenda</h2>
      </div>

      {role === 1 && (
        <div className="mb-3">
          <button className="btn btn-outline-success" onClick={() => setModalVisible(true)}>
            ➕ Novo Agendamento
          </button>
        </div>
      )}

      <div className="d-flex flex-wrap gap-2 mb-3">
        <select className="form-select" value={filtros.colaborador} onChange={(e) => setFiltros({ ...filtros, colaborador: e.target.value })}>
          <option value="">Filtrar por Colaborador</option>
          {colaboradores.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <select className="form-select" value={filtros.servico} onChange={(e) => setFiltros({ ...filtros, servico: e.target.value })}>
          <option value="">Filtrar por Serviço</option>
          {servicos.map((s) => <option key={s.id} value={s.id}>{s.nome}</option>)}
        </select>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-outline-secondary" onClick={() => setSemanaAtual((prev) => prev - 1)}>⬅ Semana Anterior</button>
        <button className="btn btn-outline-secondary" onClick={() => setSemanaAtual((prev) => prev + 1)}>Semana Seguinte ➡</button>
      </div>

      <div className="d-flex flex-column gap-3">
        {semanaDias.map((dia) => {
          const agsDia = agendamentosFiltrados.filter(
            (ag) => new Date(ag.data_hora).toDateString() === dia.toDateString() && ag.tipo !== "indisponibilidade"
          );

          const indispsDia = agendamentosFiltrados.filter(
            (ag) => new Date(ag.data_hora).toDateString() === dia.toDateString() && ag.tipo === "indisponibilidade"
          );

          return (
            <div className="card" key={dia.toDateString()}>
              <div className="card-header bg-light">
                <strong>{dia.toLocaleDateString("pt-PT", { weekday: "long", day: "2-digit", month: "2-digit" })}</strong>
              </div>
              <div className="card-body p-2">
                {agsDia.map((ag) => (
                  <div key={ag.id} className="mb-2 border rounded p-2">
                    <strong>{new Date(ag.data_hora).toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}</strong>
                    <div>{(ag.cliente?.nome ?? "Cliente desconhecido")} - {(ag.servico?.nome ?? "Serviço desconhecido")}</div>
                    {ag.colaborador?.nome && <small className="text-muted">👤 {ag.colaborador.nome}</small>}
                    <div className="mt-1 d-flex gap-2">
                      <button className="btn btn-sm btn-warning" onClick={() => handleEdit(ag)}>✏️</button>
                      {role === 1 && (
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ag.id)}>🗑️</button>
                      )}
                    </div>
                  </div>
                ))}

                {indispsDia.map((ag) => (
                  <div key={`ind-${ag.id}`} className="mb-2 border rounded p-2 bg-warning-subtle text-danger d-flex align-items-center justify-content-between">
                    <div>
                      <strong>⛔ Indisponível</strong>
                      <div className="small">{ag.motivo ?? "Sem motivo"}</div>
                    </div>
                    <span className="fs-4">❌</span>
                  </div>
                ))}

                {agsDia.length === 0 && indispsDia.length === 0 && (
                  <small className="text-muted">Sem agendamentos.</small>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ModalAgendamento
        visible={modalVisible}
        mode={editingItem ? "edit" : "create"}
        item={editingItem}
        onClose={() => setModalVisible(false)}
        onSave={fetchAgendamentos}
      />

      <ModalIndisponibilidade
        visible={modalIndispVisible}
        onClose={() => setModalIndispVisible(false)}
        onSave={fetchAgendamentos}
      />
    </div>
  );
};

export default Agenda;
