// BookingCalendar.tsx
import { useEffect, useState } from "react";
import { getAgendamentos } from "../services/api/agendamento";
import { toast } from "react-toastify";

interface Props {
  colaboradorId: string;
  onHoraSelecionada: (dataHora: string) => void;
  dataSelecionada: string;
}

const BookingCalendar = ({ colaboradorId, onHoraSelecionada, dataSelecionada }: Props) => {
  const [ocupados, setOcupados] = useState<string[]>([]);

  useEffect(() => {
    const carregarAgendamentos = async () => {
      try {
        const res = await getAgendamentos();
        const busy = res.data
          .filter((ag: any) => ag.colaborador?.id == colaboradorId)
          .map((ag: any) => new Date(ag.data_hora).toISOString().slice(0, 16));
        setOcupados(busy);
      } catch {
        toast.error("Erro ao carregar agendamentos.");
      }
    };

    if (colaboradorId) carregarAgendamentos();
  }, [colaboradorId, dataSelecionada]);

  const gerarHorasDia = () => {
    const horas: string[] = [];
    for (let h = 9; h <= 18; h++) {
      const hora = h.toString().padStart(2, "0") + ":00";
      horas.push(hora);
    }
    return horas;
  };

  const isOcupado = (hora: string) => {
    const dataHora = `${dataSelecionada}T${hora}`;
    return ocupados.includes(dataHora);
  };

  return (
    <div className="mt-4">
      <h6 className="mb-2">Selecione um horário disponível:</h6>
      <div className="d-flex flex-wrap gap-2">
        {gerarHorasDia().map((hora) => {
          const ocupado = isOcupado(hora);
          return (
            <button
              key={hora}
              className={`btn btn-sm ${ocupado ? "btn-secondary" : "btn-outline-primary"}`}
              disabled={ocupado}
              onClick={() => onHoraSelecionada(`${dataSelecionada}T${hora}`)}
            >
              {hora} {ocupado && "❌"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;
