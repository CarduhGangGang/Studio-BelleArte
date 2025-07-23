import { useEffect, useState } from "react";
import { getAgendamentos, apagarAgendamento } from "../services/api/agendamento";
import ModalAgendamento from "../components/ModalAgendamento";
import { toast } from "react-toastify";
import { useAgendamento } from "../context/AgendamentoContext";
import "../App.css";

interface Agendamento {
  id: number;
  data_hora: string;
  cliente: { id: number; nome: string };
  colaborador: { id: number; nome: string };
  servico: { id: number; nome: string };
}

const BookingPage2 = ({ setStepValid }: { setStepValid: (valid: boolean) => void }) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<Agendamento | null>(null);
  const [clienteId, setClienteId] = useState<number | null>(null);

  const { ultimoAgendamento, setUltimoAgendamento } = useAgendamento();

  useEffect(() => {
    const clienteData = localStorage.getItem("clienteLogado");
    if (clienteData) {
      try {
        const cliente = JSON.parse(clienteData);
        setClienteId(cliente.id);
      } catch {
        toast.error("Erro ao carregar cliente");
      }
    }

    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const res = await getAgendamentos();
      setAgendamentos(res.data);
    } catch {
      toast.error("Erro ao carregar agendamentos");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      try {
        await apagarAgendamento(id);
        toast.success("Agendamento cancelado.");
        await fetchAgendamentos();
      } catch {
        toast.error("Erro ao cancelar agendamento.");
      }
    }
  };

  const handleEdit = (ag: Agendamento) => {
    setEditingItem(ag);
    setModalVisible(true);
  };

  const agendamentosCliente = agendamentos.filter(
    (ag) => ag.cliente && ag.cliente.id === clienteId
  );

  useEffect(() => {
    if (agendamentosCliente.length === 0) {
      setUltimoAgendamento(null);
      localStorage.removeItem("ultimoAgendamento");
    }
    setStepValid(agendamentosCliente.length > 0);
  }, [agendamentosCliente, setUltimoAgendamento, setStepValid]);

  const formatDate = (data: string) =>
    new Date(data).toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
    });

  const formatTime = (data: string) =>
    new Date(data).toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="container mt-4">
      <h6 className="m-b5">Agendamento efetuado com sucesso!</h6>

      {ultimoAgendamento && agendamentosCliente.length > 0 ? (
        <p className="m-b0">
          Reservaste o serviço <b className="text-black">{ultimoAgendamento.servico.nome}</b> com{" "}
          <b className="text-black">{ultimoAgendamento.colaborador.nome}</b> às{" "}
          <b className="text-black">{formatTime(ultimoAgendamento.data_hora)}</b> no dia{" "}
          <b className="text-black">{formatDate(ultimoAgendamento.data_hora)}</b>.
          {ultimoAgendamento.preco != null && (
            <> O preço do serviço é <b className="text-black">€{ultimoAgendamento.preco.toFixed(2)}</b>.</>
          )}
        </p>
      ) : (
        <p className="text-muted">Consulta os teus agendamentos e verifica se está tudo ok.</p>
      )}

      <hr />

      <h5 className="mt-4">📋 Os teus agendamentos</h5>
      {agendamentosCliente.length === 0 ? (
        <p className="text-muted">Nenhum agendamento encontrado.</p>
      ) : (
        agendamentosCliente.map((ag) => (
          <div key={ag.id} className="card my-2">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <strong>{formatTime(ag.data_hora)}</strong> - {formatDate(ag.data_hora)} <br />
                {ag.servico.nome} com {ag.colaborador.nome}
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(ag)}>
                  ✏️
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(ag.id)}>
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      <ModalAgendamento
        visible={modalVisible}
        mode="edit"
        item={editingItem}
        onClose={() => setModalVisible(false)}
        onSave={fetchAgendamentos}
        colaboradores={[]} // Preencher se necessário
        servicos={[]} // Preencher se necessário
      />
    </div>
  );
};

export default BookingPage2;
