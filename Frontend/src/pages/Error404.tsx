import { Link } from "react-router-dom";
import '../App.css';

const Error404 = () => {
  return (
    <div
      className="page-content text-white d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://cdn.pixabay.com/photo/2020/08/17/09/30/glitch-5490946_1280.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-center px-3">
        <h1 className="display-1 fw-bold text-light">404</h1>
        <h2 className="fw-bold text-light">OPS!</h2>
        <p className="lead text-light mb-4">Página não encontrada.</p>
        <Link to="/" className="btn btn-outline-light px-4 py-2">
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default Error404;
