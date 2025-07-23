import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

import { login } from "../services/api/auth";
import api from "../services/api/api";
import { getLoginContent } from "../services/api/loginContent";
import { loginUser } from "../utils/auth";
import { IMAGE } from "../constent/theme";
import CommonBanner from "../element/CommonBanner";
import "../App.css";

interface BannerData {
  title: string;
  image: string;
}

const Login = () => {
  const [addActive, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [banner, setBanner] = useState<BannerData>({ title: "Login", image: IMAGE.banner1 });
  const [content, setContent] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  useEffect(() => {
    getLoginContent()
      .then(setContent)
      .catch(() => toast.warning("⚠️ Erro ao carregar textos do login."));

    api
      .get("/banner/login")
      .then((res) => setBanner(res.data))
      .catch(() => toast.warning("⚠️ Erro ao carregar banner de login."));
  }, []);

  const handleLogin = async (e?: any) => {
    if (e) e.preventDefault();

    try {
      const resposta = await login({ email, password });
      const dados = resposta.data;

      if (!dados.token || !dados.user) {
        toast.error("⚠️ Credenciais inválidas");
        return;
      }

      localStorage.setItem("user", JSON.stringify(dados.user));
      localStorage.setItem("token", dados.token);
      localStorage.setItem("nome", dados.user.nome);
      api.defaults.headers.common["Authorization"] = `Bearer ${dados.token}`;

      const role = Number(dados.user.role);

      if (role === 1) {
        loginUser({ ...dados.user, token: dados.token }, "admin");
        navigate("/admin");
      } else if (role === 2) {
        loginUser({ ...dados.user, token: dados.token }, "studio");
        navigate("/studio");
      } else if (role === 3) {
        loginUser({ ...dados.user, token: dados.token }, "cliente");
        navigate("/booking");
      }

      toast.success("🎉 Login com sucesso!");
    } catch (err: any) {
      console.error("Erro no login:", err);
      toast.error("❌ Erro ao tentar iniciar sessão");
    }
  };

  const handleRecover = (e?: any) => {
    if (e) e.preventDefault();

    if (!recoveryEmail) {
      toast.warning("📭 Insere um email válido.");
      return;
    }

    toast.success("📩 Se existir uma conta com esse email, receberás instruções.");
    setRecoveryEmail("");
    setActive(false);
  };

  return (
    <motion.div
      className="page-content bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <CommonBanner title={banner.title} image={banner.image} />

      <div className="section-full content-inner shop-account">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="font-weight-700 m-t0 m-b20">
                {content.login_heading || "Login na tua conta"}
              </h3>
            </div>
          </div>

          <div className="max-w500 m-auto m-b30">
            <div className="p-a30 border-1 seth">
              <div className="tab-content nav">
                {/* LOGIN FORM */}
                <form
                  onSubmit={handleLogin}
                  className={`tab-pane col-12 p-a0 ${!addActive ? "active show" : ""}`}
                >
                  <h4 className="font-weight-700">{content.login_title || "LOGIN"}</h4>
                  <p className="font-weight-600">
                    {content.login_subtitle || "Entra com os teus dados."}
                  </p>

                  <div className="form-group">
                    <label className="font-weight-700">
                      {content.label_email || "E-MAIL *"}
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={content.placeholder_email || "O teu email"}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="font-weight-700">
                      {content.label_password || "PASSWORD *"}
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={content.placeholder_password || "A tua password"}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-dark button-lg radius-no">
                      {content.button_login || "LOGIN"}
                    </button>
                    <Link
                      onClick={() => setActive(true)}
                      to="#"
                      className="text-black font-weight-bold text-decoration-none ms-auto"
                    >
                      <i className="fa fa-unlock-alt"></i> {content.link_forgot || "Esqueci a senha"}
                    </Link>
                  </div>
                </form>

                {/* RECUPERAR PASSWORD */}
                <form
                  onSubmit={handleRecover}
                  className={`tab-pane fade col-12 p-a0 ${addActive ? "active show" : ""}`}
                >
                  <h4 className="font-weight-700">{content.recovery_title || "RECUPERAR PASSWORD"}</h4>
                  <p className="font-weight-600">
                    {content.recovery_subtitle || "Enviaremos um e-mail para redefinir a tua password."}
                  </p>

                  <div className="form-group">
                    <label className="font-weight-700">
                      {content.label_email || "E-MAIL *"}
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      placeholder={content.placeholder_email || "O teu email"}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <Link onClick={() => setActive(false)} className="btn btn-outline-secondary" to="#">
                      {content.button_back || "Voltar"}
                    </Link>
                    <button type="submit" className="btn btn-dark button-lg radius-no">
                      {content.button_submit || "Submeter"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="mb-0">
                {content.text_new_user || "És novo aqui?"}{" "}
                <Link to="/registor" className="fw-bold text-dark text-decoration-none">
                  {content.link_register || "Cria a tua conta."}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default Login;
