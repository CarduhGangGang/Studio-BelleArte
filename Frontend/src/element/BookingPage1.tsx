import { useEffect, useState } from "react";
import { criarAgendamento, getAgendamentos } from "../services/api/agendamento";
import { getColaboradores } from "../services/api/utilizador";
import { getServicos } from "../services/api/service";
import { getBookingConfig } from "../services/api/bookingPage1Config";
import { toast } from "react-toastify";
import { useAgendamento } from "../context/AgendamentoContext";
import "../App.css";

const BookingPage1 = ({
  setStepValid,
  goToNextStep,
}: {
  setStepValid: (valid: boolean) => void;
  goToNextStep: () => void;
}) => {
  const [form, setForm] = useState({
    data: "",
    hora: "",
    colaborador_id: "",
    servico_id: "",
  });

  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [servicos, setServicos] = useState<any[]>([]);
  const [ocupados, setOcupados] = useState<string[]>([]);
  const [clienteLogado, setClienteLogado] = useState<{ id: number; nome: string } | null>(null);
  const { setUltimoAgendamento } = useAgendamento();

  const [textos, setTextos] = useState({
    titulo: "BOOKING",
    descricao: "Por favor seleciona o serviço que desejas:",
    label_servico: "Serviço",
    label_colaborador: "Colaborador",
    label_data: "Data",
    label_hora_disponivel: "Hora disponível:",
    btn_agendar: "Agendar",
  });

  const hoje = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [resColaboradores, resServicos] = await Promise.all([
          getColaboradores(),
          getServicos(),
        ]);
        setColaboradores(resColaboradores.data);
        setServicos(resServicos.data);
      } catch {
        toast.error("Erro ao carregar dados");
      }

      try {
        const config = await getBookingConfig();
        setTextos(config);
      } catch {
        toast.error("Erro ao carregar textos personalizados");
      }

      const clienteData = localStorage.getItem("clienteLogado");
      if (clienteData) {
        try {
          const cliente = JSON.parse(clienteData);
          setClienteLogado(cliente);
        } catch {
          toast.error("Erro ao interpretar os dados do cliente.");
        }
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    const carregarOcupados = async () => {
      if (!form.colaborador_id) return;

      try {
        const res = await getAgendamentos();
        const busy = res.data
          .filter((ag: any) => ag.colaborador?.id == form.colaborador_id)
          .map((ag: any) => new Date(ag.data_hora).toISOString().slice(0, 16));
        setOcupados(busy);
      } catch {
        toast.error("Erro ao verificar horários ocupados");
      }
    };

    carregarOcupados();
  }, [form.colaborador_id, form.data]);

  const gerarHorasDia = () => {
    const horas: string[] = [];
    for (let h = 9; h <= 18; h++) {
      horas.push(h.toString().padStart(2, "0") + ":00");
    }
    return horas;
  };

  const isHoraOcupada = (hora: string) => {
    const dataHora = `${form.data}T${hora}`;
    return ocupados.includes(dataHora);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!clienteLogado) return toast.error("Cliente não autenticado.");

    try {
      const payload = {
        data_hora: `${form.data}T${form.hora}`,
        cliente_id: clienteLogado.id,
        colaborador_id: Number(form.colaborador_id),
        servico_id: Number(form.servico_id),
        estado: "pendente",
        coluna: "Semana",
      };

      await criarAgendamento(payload);
      toast.success("Agendamento criado com sucesso!");
      setStepValid(true);

      const servico = servicos.find((s) => s.id === Number(form.servico_id));
      const colaborador = colaboradores.find((c) => c.id === Number(form.colaborador_id));

      setUltimoAgendamento({
        data_hora: `${form.data}T${form.hora}`,
        servico: { nome: servico?.nome || "" },
        colaborador: { nome: colaborador?.nome || "" },
        cliente: { nome: clienteLogado.nome },
        preco: servico?.preco || null,
      });

      goToNextStep();
    } catch {
      toast.error("Erro ao criar agendamento");
    }
  };

  return (
    <div id="time" className="wizard-box tab-pane step-content">
      <h6 className="m-b30" style={{ color: "#000000", fontWeight: "bold" }}>
        {textos.titulo}
      </h6>
      <p className="mb-4">{textos.descricao}</p>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>{textos.label_servico}</label>
          <select
            className="form-control"
            value={form.servico_id}
            onChange={(e) => setForm({ ...form, servico_id: e.target.value })}
            required
          >
            <option value="">-- Seleciona o serviço --</option>
            {servicos.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>{textos.label_colaborador}</label>
          <select
            className="form-control"
            value={form.colaborador_id}
            onChange={(e) => setForm({ ...form, colaborador_id: e.target.value })}
            required
          >
            <option value="">-- Seleciona o colaborador --</option>
            {colaboradores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-6 form-group">
          <label>{textos.label_data}</label>
          <input
            type="date"
            className="form-control"
            value={form.data}
            min={hoje}
            max={maxDateStr}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            required
          />
        </div>

        {form.data && form.colaborador_id && (
          <div className="col-12 mt-3">
            <label>{textos.label_hora_disponivel}</label>
            <div className="d-flex flex-wrap gap-2">
              {gerarHorasDia().map((hora) => {
                const ocupado = isHoraOcupada(hora);
                return (
                  <button
                    key={hora}
                    type="button"
                    className={`btn btn-sm ${
                      ocupado
                        ? "btn-secondary"
                        : form.hora === hora
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    disabled={ocupado}
                    onClick={() => setForm({ ...form, hora })}
                  >
                    {ocupado ? "❌" : hora}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="col-12 mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!form.data || !form.hora}
          >
            {textos.btn_agendar}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingPage1;
