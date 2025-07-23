import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBookingPage2Config, updateBookingPage2Config } from "../services/api/bookingPage2Config";

const BookingPage2Editor = () => {
  const [form, setForm] = useState({
    label_1: "",
    label_2: "",
    label_3: "",
    label_4: "",
    btn: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = await getBookingPage2Config();
        // Renomear dados da API para os novos nomes de campos
        setForm({
          label_1: config.titulo,
          label_2: config.subtitulo,
          label_3: config.label_agendamentos,
          label_4: config.msg_sem_agendamentos,
          btn: config.btn_apagar, // Exibiremos só um botão como preview
        });
      } catch {
        toast.error("Erro ao carregar configurações");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBookingPage2Config({
        titulo: form.label_1,
        subtitulo: form.label_2,
        label_agendamentos: form.label_3,
        msg_sem_agendamentos: form.label_4,
        btn_editar: "✏️", // fixo
        btn_apagar: form.btn,
      });
      toast.success("Configurações salvas com sucesso!");
    } catch {
      toast.error("Erro ao atualizar configurações");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Edição de Booking 2</h2>
      <form onSubmit={handleSubmit} className="row g-4 mb-5">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="col-md-6">
            <label className="form-label text-capitalize">{key.replace("_", " ")}</label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-dark">Guardar</button>
        </div>
      </form>

      <hr />

      <h4 className="mb-3">Pré-visualização:</h4>
      <div className="p-4 border rounded bg-light">
        <h5 className="fw-bold">{form.label_1}</h5>
        <p>{form.label_2}</p>

        <h6>📋 {form.label_3}</h6>
        <p className="text-muted">{form.label_4}</p>

        <div className="d-flex gap-2 mt-3">
          <button className="btn btn-sm btn-warning" disabled>✏️</button>
          <button className="btn btn-sm btn-danger" disabled>{form.btn}</button>
        </div>
      </div>
    </div>
  );
};

export default BookingPage2Editor;
