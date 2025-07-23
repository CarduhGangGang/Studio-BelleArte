import { useEffect, useState } from "react";
import { getBookingConfig, updateBookingConfig } from "../services/api/bookingPage1Config";
import { toast } from "react-toastify";

const BookingPage1Editor = () => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    label_1: "",
    label_2: "",
    label_3: "",
    label_4: "",
    btn: "",
  });

  const camposExcluidos = ["id", "createdAt", "updatedAt"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingConfig();

        const configLimpo = Object.entries(data).reduce((acc, [key, value]) => {
          if (!camposExcluidos.includes(key)) {
            // Renomear chaves se necessário
            if (key === "label_servico") acc.label_1 = value;
            else if (key === "label_colaborador") acc.label_2 = value;
            else if (key === "label_data") acc.label_3 = value;
            else if (key === "label_hora_disponivel") acc.label_4 = value;
            else if (key === "btn_agendar") acc.btn = value;
            else acc[key] = value;
          }
          return acc;
        }, {} as typeof form);

        setForm(configLimpo);
      } catch {
        toast.error("Erro ao buscar configurações");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        titulo: form.titulo,
        descricao: form.descricao,
        label_servico: form.label_1,
        label_colaborador: form.label_2,
        label_data: form.label_3,
        label_hora_disponivel: form.label_4,
        btn_agendar: form.btn,
      };

      await updateBookingConfig(payload);
      toast.success("Configuração atualizada com sucesso");
    } catch {
      toast.error("Erro ao atualizar configurações");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Edição de Booking 1</h2>
      <form onSubmit={handleSubmit} className="row g-4 mb-5">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="col-md-6">
            <label className="form-label text-capitalize">
              {key === "label_1"
                ? "Label 1"
                : key === "label_2"
                ? "Label 2"
                : key === "label_3"
                ? "Label 3"
                : key === "label_4"
                ? "Label 4"
                : key === "btn"
                ? "Btn"
                : key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button className="btn btn-dark px-4" type="submit">
            Guardar Alterações
          </button>
        </div>
      </form>

      <hr />

      {/* Pré-visualização dinâmica do BookingPage1 */}
      <h4 className="mb-3">Pré-visualização:</h4>
      <div className="p-4 border rounded bg-light">
        <h5 className="fw-bold">{form.titulo}</h5>
        <p>{form.descricao}</p>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">{form.label_1}</label>
            <select className="form-select" disabled>
              <option>-- Exemplo --</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">{form.label_2}</label>
            <select className="form-select" disabled>
              <option>-- Exemplo --</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">{form.label_3}</label>
            <input type="date" className="form-control" disabled />
          </div>

          <div className="col-12 mt-3">
            <label className="form-label">{form.label_4}</label>
            <div className="d-flex gap-2 flex-wrap">
              {["09:00", "10:00", "11:00"].map((hora) => (
                <button key={hora} className="btn btn-outline-secondary btn-sm" disabled>
                  {hora}
                </button>
              ))}
            </div>
          </div>

          <div className="col-12 mt-4">
            <button className="btn btn-primary" disabled>
              {form.btn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage1Editor;
