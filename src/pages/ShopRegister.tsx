import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import CommonBanner from "../element/CommonBanner";
import api from "../services/api/api";
import { IMAGE } from "../constent/theme";
import { getRegisterContent } from "../services/api/registerContent";

interface BannerData {
  title: string;
  image: string;
}

const ShopRegister = () => {
  const navigate = useNavigate();
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<BannerData>({ title: "Registo", image: IMAGE.banner1 });

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
    api.get("/banner/register")
      .then((res) => setBanner(res.data))
      .catch(() => toast.warning("⚠️ Erro ao carregar banner de registo."));

    getRegisterContent()
      .then((res) => setTexts({ ...defaultTexts, ...res }))
      .catch(() => toast.error("Erro ao carregar textos."));
  }, []);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast.warning("⚠️ As passwords não coincidem.");
      return;
    }

    if (password.length < 6) {
      toast.warning("⚠️ A password deve ter pelo menos 6 caracteres.");
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

  return (
    <motion.div
      className="page-content bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <CommonBanner title={banner.title} image={banner.image} />

      <div className="section-full content-inner shop-account">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h3 className="font-weight-700 m-t0 m-b20">{texts.register_heading}</h3>
            </div>
          </div>

          <div className="max-w500 m-auto m-b30">
            <div className="p-a30 border-1 seth">
              <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                <h4 className="font-weight-700">{texts.register_title}</h4>
                <p className="font-weight-600">{texts.register_subtitle}</p>

                <div className="form-group">
                  <label className="font-weight-700">{texts.label_first_name}</label>
                  <input
                    className="form-control"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={texts.placeholder_first_name}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-weight-700">{texts.label_last_name}</label>
                  <input
                    className="form-control"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={texts.placeholder_last_name}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-weight-700">{texts.label_email}</label>
                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={texts.placeholder_email}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-weight-700">{texts.label_password}</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={texts.placeholder_password}
                    minLength={6}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="font-weight-700">{texts.label_confirm_password}</label>
                  <input
                    className="form-control"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder={texts.placeholder_confirm_password}
                    minLength={6}
                    required
                  />
                </div>

                <div className="text-left">
                  <button
                    type="submit"
                    className="btn button-lg radius-no text-white w-100"
                    style={{ backgroundColor: "#000" }}
                  >
                    {texts.button_register}
                  </button>
                </div>
              </form>
            </div>

            <div className="text-center mt-4">
              <p className="mb-0">
                {texts.text_login_prompt}{" "}
                <Link to="/login" className="fw-bold text-dark text-decoration-none">
                  {texts.link_login}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ShopRegister;
