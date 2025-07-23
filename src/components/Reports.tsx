import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend
} from "recharts";

const userData = [
  { perfil: "Administrador", total: 4 },
  { perfil: "Usuário", total: 12 },
];

const accessData = [
  { mes: "Jan", acessos: 50 },
  { mes: "Fev", acessos: 80 },
  { mes: "Mar", acessos: 120 },
  { mes: "Abr", acessos: 90 },
  { mes: "Mai", acessos: 130 },
  { mes: "Jun", acessos: 75 },
];

const COLORS = ["#0088FE", "#FF8042"];

const Reports: React.FC = () => {
  return (
    <div className="container py-4">
      <h3 className="mb-4">📊 Relatórios & Estatísticas</h3>

      <div className="row">
        {/* Gráfico de Barras */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">Usuários por Perfil</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="perfil" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Linha */}
        <div className="col-md-6 mb-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">Acessos Mensais</h6>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={accessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="acessos" stroke="#28a745" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pizza */}
        <div className="col-md-12 mb-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-center">Distribuição de Perfis</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="total"
                  nameKey="perfil"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
