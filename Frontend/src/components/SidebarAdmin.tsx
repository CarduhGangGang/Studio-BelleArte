import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  onClose?: () => void;
  isAdminView?: boolean;
};

const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab, onClose, isAdminView }) => {
  const tabs = isAdminView
    ? [
        { key: "painel", label: "Painel", icon: "🏠" },
        { key: "users", label: "Usuários", icon: "👥" },
        { key: "settings", label: "Configurações", icon: "⚙️" },
        { key: "reports", label: "Relatórios", icon: "📊" },
        { key: "logs", label: "Logs", icon: "🧾" },
      ]
    : [];

  return (
    <div
      className="bg-white border-end position-fixed"
      style={{ width: "250px", height: "100vh", zIndex: 1040 }}
    >
      <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
        <strong>Admin</strong>
        {onClose && (
          <button className="btn btn-sm btn-outline-danger" onClick={onClose}>
            ×
          </button>
        )}
      </div>
      <ul className="nav flex-column">
        {tabs.map((tab) => (
          <li key={tab.key} className="nav-item">
            <button
              className={`nav-link text-start w-100 ${
                activeTab === tab.key ? "bg-light fw-bold" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <span className="me-2">{tab.icon}</span> {tab.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
