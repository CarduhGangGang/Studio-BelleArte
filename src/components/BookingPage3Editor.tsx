import { useEffect, useState } from "react";
import { getBookingPage3Config, updateBookingPage3Config } from "../services/api/bookingPage3Config";
import { toast } from "react-toastify";

const BookingPage3Editor = () => {
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    texto_botao: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookingPage3Config();
        const { id, createdAt, updatedAt, ...rest } = data;
        setForm(rest);
      } catch {
        toast.error("Erro ao carregar configurações");
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
      await updateBookingPage3Config(form);
      toast.success("Configurações salvas com sucesso!");
    } catch {
      toast.error("Erro ao atualizar configurações");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Edição de Booking 3</h2>

      <form onSubmit={handleSubmit} className="row g-4 mb-5">
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Descrição</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Texto do Botão</label>
          <input
            type="text"
            name="texto_botao"
            value={form.texto_botao}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-dark px-4">Guardar Alterações</button>
        </div>
      </form>

      <hr />

      <h4 className="mb-3">Pré-visualização:</h4>
      <div className="border p-5 bg-white text-center" style={{ maxWidth: 900, margin: "0 auto" }}>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: 120, height: 120, border: "5px solid #28a745", borderRadius: "50%", margin: "0 auto" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            fill="#28a745"
            className="bi bi-check"
            viewBox="0 0 16 16"
          >
            <path d="M13.485 1.929a1 1 0 0 1 1.415 1.414l-8 8a1 1 0 0 1-1.415 0l-4-4a1 1 0 1 1 1.415-1.414L6.5 8.086l7.071-7.071z" />
          </svg>
        </div>
        <h2 className="mt-4">{form.titulo}</h2>
        <p className="text-muted">{form.descricao}</p>
        <button className="btn btn-dark mt-3" disabled>{form.texto_botao}</button>
      </div>
    </div>
  );
};

export default BookingPage3Editor;
