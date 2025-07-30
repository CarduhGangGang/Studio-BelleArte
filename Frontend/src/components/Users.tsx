import React, { useEffect, useState } from "react";
import { Table, Button, OverlayTrigger, Tooltip, Pagination } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus, FaFilePdf, FaFileExcel } from "react-icons/fa";
import UserModal from "./UserModal";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const roleMap = {
  1: "Administrador",
  2: "Colaborador",
  3: "Cliente",
} as const;

type RoleId = keyof typeof roleMap;

type User = {
  id: number;
  nome: string;
  email: string;
  role_id: number;
};

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form, setForm] = useState({ nome: "", email: "", role_id: 3 });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20;

  const apiUrl = `${import.meta.env.VITE_API_URL}/api/utilizador`;

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(apiUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const sorted = res.data.sort((a, b) => a.role_id - b.role_id);
      setUsers(sorted);
    } catch (err) {
      console.error("Erro ao buscar utilizadores:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user?: User) => {
    setEditingUser(user || null);
    setForm(user || { nome: "", email: "", role_id: 3 });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setForm({ nome: "", email: "", role_id: 3 });
  };

  const handleSave = async () => {
    if (!form.nome.trim() || !form.email.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      if (editingUser) {
        await axios.put(`${apiUrl}/${editingUser.id}`, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await axios.post(apiUrl, form, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }

      closeModal();
      fetchUsers();
    } catch (err) {
      console.error("Erro ao salvar:", err);
      alert("Erro ao salvar utilizador.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente remover este utilizador?")) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Erro ao remover:", err);
      alert("Erro ao remover utilizador.");
    }
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Utilizadores");
    XLSX.writeFile(wb, "utilizadores.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["ID", "Nome", "Email", "Perfil"];
    const tableRows = users.map((user) => [user.id, user.nome, user.email, roleMap[user.role_id as RoleId]]);
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("utilizadores.pdf");
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="container py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
        <h4 className="fw-bold text-dark m-0">
          <FaPlus className="me-2 text-primary" /> Gestão de Utilizadores
        </h4>
        <div className="d-flex gap-2">
          <Button variant="success" size="sm" onClick={exportToExcel}><FaFileExcel /> Exportar Excel</Button>
          <Button variant="dark" size="sm" onClick={() => openModal()}><FaPlus /> Novo Utilizador</Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover responsive size="sm">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">Nenhum utilizador encontrado.</td>
              </tr>
            ) : (
              currentUsers.map((user) => (
                <tr key={user.id}>
                  <td className="text-center">{user.id}</td>
                  <td>{user.nome}</td>
                  <td>{user.email}</td>
                  <td>{roleMap[user.role_id as RoleId]}</td>
                  <td className="text-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openModal(user)}><FaEdit /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Remover</Tooltip>}>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}><FaTrash /></Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Paginação */}
      <Pagination className="justify-content-center mt-3">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item
            key={idx + 1}
            active={idx + 1 === currentPage}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <UserModal
        show={showModal}
        onClose={closeModal}
        onSave={handleSave}
        form={form}
        setForm={setForm}
        isEditing={!!editingUser}
      />
    </div>
  );
};

export default Users;
