import { useEffect, useState } from "react";
import {
  getContactSectionConfig,
  updateContactSectionConfig,
  ContactSectionConfig,
} from "../services/api/contact";
import { toast } from "react-toastify";
import "bootstrap-icons/font/bootstrap-icons.css";

const ContactEditor = () => {
  const [config, setConfig] = useState<ContactSectionConfig>({
    title: "",
    subtitle: "",
    whatsappNumber: "",
    address: "",
    email: "",
    phone: "",
    mapsEmbedUrl: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getContactSectionConfig()
      .then((data) => {
        setConfig({
          title: data.title || "",
          subtitle: data.subtitle || "",
          whatsappNumber: data.whatsappNumber || "",
          address: data.address || "",
          email: data.email || "",
          phone: data.phone || "",
          mapsEmbedUrl: data.mapsEmbedUrl || "",
        });
      })
      .catch((err) => {
        console.error("Erro ao carregar dados de contacto:", err);
        toast.error("Erro ao carregar dados de contacto");
      });
  }, []);

  const handleChange = (field: keyof ContactSectionConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContactSectionConfig(config);
      toast.success("Dados de contacto atualizados com sucesso!");
    } catch (err) {
      console.error("Erro ao guardar dados:", err);
      toast.error("Erro ao guardar dados");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-left mb-4">Edição da página de Contacto</h2>
      <div className="row gy-4">
        {/* 📝 Formulário de edição */}
        <div className="col-md-6">
          <h4 className="mb-3">Editar Conteúdo</h4>
          <div className="mb-3">
            <input
              className="form-control mb-2"
              placeholder="Título"
              value={config.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              placeholder="Subtítulo"
              rows={3}
              value={config.subtitle}
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Morada"
              value={config.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Email"
              value={config.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <input
              className="form-control mb-2"
              placeholder="Telefone"
              value={config.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <input
              className="form-control"
              placeholder="URL do Google Maps"
              value={config.mapsEmbedUrl}
              onChange={(e) => handleChange("mapsEmbedUrl", e.target.value)}
            />
          </div>

          <button
            className="btn btn-success"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {/* 🔍 Preview ao vivo */}
        <div className="col-md-6">
          <h4 className="mb-3 text-center">{config.title || "Preview"}</h4>
          <p className="text-center">{config.subtitle}</p>

          <div className="p-4 border rounded bg-light shadow-sm mb-4">
            <h5 className="mb-3">Contactos</h5>
            <p>Utilize os dados abaixo para nos contactar diretamente:</p>

            {/* Morada */}
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-geo-alt-fill me-3 fs-4 text-warning"></i>
              <div>
                <strong>Morada:</strong>
                <p className="mb-0">{config.address}</p>
              </div>
            </div>

            {/* Email */}
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-envelope-fill me-3 fs-4 text-warning"></i>
              <div>
                <strong>Email:</strong>
                <p className="mb-0">{config.email}</p>
              </div>
            </div>

            {/* Telefone */}
            <div className="d-flex align-items-start mb-3">
              <i className="bi bi-phone-fill me-3 fs-4 text-warning"></i>
              <div>
                <strong>Telefone:</strong>
                <p className="mb-0">{config.phone}</p>
              </div>
            </div>

            {/* WhatsApp */}
            {config.whatsappNumber && (
              <div className="d-flex align-items-start">
                <i className="bi bi-whatsapp me-3 fs-4 text-success"></i>
                <div>
                  <strong>WhatsApp:</strong>
                  <p className="mb-0">{config.whatsappNumber}</p>
                </div>
              </div>
            )}
          </div>

          {/* Google Maps */}
          <div className="ratio ratio-4x3 rounded overflow-hidden shadow-sm">
            {config.mapsEmbedUrl ? (
              <iframe
                src={config.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                title="Mapa"
              ></iframe>
            ) : (
              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                Sem mapa definido
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactEditor;
