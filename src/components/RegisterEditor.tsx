import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getRegisterContent, updateRegisterContent } from "../services/api/registerContent";

const RegisterEditor = () => {
  const navigate = useNavigate();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultTexts = {
    register_heading: "Cria a tua conta",
    register_title: "INFORMAÇÕES PESSOAIS",
    register_subtitle: "Preenche os teus dados abaixo.",
    label_first_name: "Primeiro Nome *",
    label_last_name: "Último Nome *",
    label_email: "E-MAIL *",
    label_password: "PASSWORD *",
    label_confirm_password: "CONFIRMAR PASSWORD *",
    placeholder_first_name: "Primeiro nome",
    placeholder_last_name: "Último nome",
    placeholder_email: "O teu email",
    placeholder_password: "A tua password",
    placeholder_confirm_password: "Repete a tua password",
    button_register: "REGISTAR",
    text_login_prompt: "Já tens conta?",
    link_login: "Entra aqui."
  };

  useEffect(() => {
    getRegisterContent()
      .then((res) => setTexts({ ...defaultTexts, ...res }))
      .catch(() => toast.error("Erro ao carregar textos"))
      .finally(() => setLoading(false));
  }, []);

  const handleTextChange = (key: string, value: string) => {
    setTexts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTexts = async () => {
    try {
      await updateRegisterContent(texts);
      toast.success("Textos salvos com sucesso!");
    } catch {
      toast.error("Erro ao salvar os textos.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.warning("⚠️ As passwords não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, role: "3" })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("✅ Conta criada com sucesso!");
        navigate("/login");
      } else {
        toast.error(data.message || "❌ Erro no registo.");
      }
    } catch {
      toast.error("❌ Erro ao conectar com o servidor.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edição da Página de Registo</h2>
      <div className="row">
        {/* Editor */}
        <div className="col-md-6 border-end">
          {Object.entries(texts).map(([key, value]) => (
            <div key={key} className="form-group mb-3">
              <label className="form-label fw-bold">{key}</label>
              <input
                className="form-control"
                value={value}
                onChange={(e) => handleTextChange(key, e.target.value)}
              />
            </div>
          ))}
          <button className="btn btn-success mt-3" onClick={handleSaveTexts}>
            Salvar Alterações
          </button>
        </div>

        {/* Preview funcional */}
        <div className="col-md-6">
          <div className="p-4 border rounded bg-light">
            <h3 className="text-center mb-4">{texts.register_heading}</h3>
            <form onSubmit={handleRegister}>
              <h4 className="fw-bold">{texts.register_title}</h4>
              <p>{texts.register_subtitle}</p>

              <div className="form-group mb-2">
                <label className="fw-bold">{texts.label_first_name}</label>
                <input
                  className="form-control"
                  placeholder={texts.placeholder_first_name}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="fw-bold">{texts.label_last_name}</label>
                <input
                  className="form-control"
                  placeholder={texts.placeholder_last_name}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="fw-bold">{texts.label_email}</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder={texts.placeholder_email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-2">
                <label className="fw-bold">{texts.label_password}</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={texts.placeholder_password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label className="fw-bold">{texts.label_confirm_password}</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={texts.placeholder_confirm_password}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                {texts.button_register}
              </button>
            </form>

            <p className="text-center mt-3">
              {texts.text_login_prompt} <Link to="/login"><strong>{texts.link_login}</strong></Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEditor;
