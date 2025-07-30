import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../services/api/api";
import '../App.css';

interface ServiceItem {
  id?: number;
  name: string;
  desc: string;
  img: string;
}

interface ServiceData {
  title: string;
  description: string;
  services: ServiceItem[];
}

const API_BASE = import.meta.env.VITE_API_URL;
const fullImageUrl = (path: string) =>
  path.startsWith("http") ? path : `${API_BASE}/${path.replace(/^\/+/, "")}`;

const ServiceDetail = () => {
  const [data, setData] = useState<ServiceData>({
    title: "",
    description: "",
    services: [],
  });

  useEffect(() => {
    axios
      .get("/service-list")
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("❌ Erro ao carregar serviços:", err);
      });
  }, []);

  return (
    <div className="page-content bg-white">
      <div className="container py-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold">{data.title}</h2>
          <p className="text-muted col-lg-8 mx-auto">{data.description}</p>
          <div
            className="mx-auto my-3"
            style={{ width: "60px", height: "3px", backgroundColor: "#c9a255" }}
          />
        </motion.div>

        <div className="d-flex flex-column gap-5">
          {data.services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={service.id ?? index}
                className="row align-items-center g-4"
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {isEven && (
                  <div className="col-md-6">
                    <img
                      src={fullImageUrl(service.img)}
                      alt={service.name}
                      className="img-fluid rounded shadow"
                    />
                  </div>
                )}
                <div className="col-md-6">
                  <h3 className="fw-bold text-dark">{service.name}</h3>
                  <p className="text-muted fs-6">{service.desc}</p>
                </div>
                {!isEven && (
                  <div className="col-md-6">
                    <img
                      src={fullImageUrl(service.img)}
                      alt={service.name}
                      className="img-fluid rounded shadow"
                    />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
