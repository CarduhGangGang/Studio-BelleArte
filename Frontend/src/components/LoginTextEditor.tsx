import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getLoginContent, updateLoginContent } from "../services/api/loginContent";
import { login } from "../services/api/auth";
import api from "../services/api/api";
import { loginUser } from "../utils/auth";

const LoginTextEditor = () => {
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverMode, setRecoverMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const defaultTexts: Record<string, string> = {
    login_heading: "Login na tua conta",
    login_title: "LOGIN",
    login_subtitle: "Entra com os teus dados.",
    label_email: "E-MAIL *",
    label_password: "PASSWORD *",
    placeholder_email: "O teu email",
    placeholder_password: "A tua password",
    button_login: "LOGIN",
    link_forgot: "Esqueci a senha",
    text_new_user: "És novo aqui?",
    link_register: "Cria a tua conta.",
    recovery_title: "RECUPERAR PASSWORD",
    recovery_subtitle: "Enviaremos um e-mail para redefinir",
    button_back: "Voltar",
    button_submit: "Submeter",
  };

  useEffect(() => {
    getLoginContent()
      .then((res) => {
        const merged = { ...defaultTexts, ...res };
        setTexts(merged);
      })
      .catch(() => toast.error("Erro ao carregar textos"))
      .finally(() => setLoading(false));
  }, []);

  const handleTextChange = (key: string, value: string) => {
    setTexts((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveTexts = async () => {
    try {
      await updateLoginContent(texts);
      toast.success("Textos salvos com sucesso!");
    } catch {
      toast.error("Erro ao salvar os textos.");
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });
      const data = res.data;

      if (!data.token || !data.user) {
        toast.error("⚠️ Credenciais inválidas");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      localStorage.setItem("nome", data.user.nome);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      const role = Number(data.user.role);
      if (role === 1) navigate("/admin");
      else if (role === 2) navigate("/studio");
      else navigate("/booking");

      loginUser({ ...data.user, token: data.token }, "login");
      toast.success("🎉 Login com sucesso!");
    } catch {
      toast.error("❌ Erro ao tentar iniciar sessão");
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recoveryEmail) {
      toast.warning("📭 Insere um email válido.");
      return;
    }

    toast.success("📩 Se existir uma conta com esse email, receberás instruções.");
    setRecoveryEmail("");
    setRecoverMode(false);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4">Edição da Página de Login</h2>
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
            <h3 className="text-center mb-4">{texts.login_heading}</h3>

            {!recoverMode && (
              <form onSubmit={handleLoginSubmit}>
                <h4 className="fw-bold">{texts.login_title}</h4>
                <p>{texts.login_subtitle}</p>

                <div className="form-group mb-3">
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

                <div className="form-group mb-3">
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

                <div className="d-flex justify-content-between align-items-center">
                  <button type="submit" className="btn btn-dark">
                    {texts.button_login}
                  </button>
                  <span
                    className="text-muted cursor-pointer"
                    style={{ cursor: "pointer" }}
                    onClick={() => setRecoverMode(true)}
                  >
                    <i className="fa fa-unlock-alt"></i> {texts.link_forgot}
                  </span>
                </div>

                <p className="mt-4 text-center">
                  {texts.text_new_user} <strong>{texts.link_register}</strong>
                </p>
              </form>
            )}

            {recoverMode && (
              <form onSubmit={handleRecover}>
                <h4 className="fw-bold">{texts.recovery_title}</h4>
                <p>{texts.recovery_subtitle}</p>

                <div className="form-group mb-3">
                  <label className="fw-bold">{texts.label_email}</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={texts.placeholder_email}
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setRecoverMode(false)}
                  >
                    {texts.button_back}
                  </button>
                  <button type="submit" className="btn btn-dark">
                    {texts.button_submit}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTextEditor;
