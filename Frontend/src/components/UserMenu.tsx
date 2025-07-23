import { useEffect, useState } from "react";

const UserMenu = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserName(parsed.nome); // ou "username", "email", dependendo do backend
      } catch (err) {
        console.error("Erro ao processar utilizador: ", err);
      }
    }
  }, []);

  if (!userName) return null;

  return (
    <div className="dropdown">
      <button
        className="btn btn-sm btn-outline-dark dropdown-toggle"
        type="button"
        id="dropdownUser"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {userName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownUser">
        <li><a className="dropdown-item" href="/studio">Painel</a></li>
        <li><a className="dropdown-item" href="/perfil">Perfil</a></li>
        <li><hr className="dropdown-divider" /></li>
        <li>
          <button
            className="dropdown-item text-danger"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Terminar sessão
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
