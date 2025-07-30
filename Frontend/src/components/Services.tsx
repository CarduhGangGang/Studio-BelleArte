import React, { useEffect, useState } from "react";
import { Table, Button, OverlayTrigger, Tooltip, Pagination } from "react-bootstrap";
import axios from "axios";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import ServiceModal from "./ServiceModal";

type Servico = {
  id: number;
  nome: string;
  descricao: string;
  preco: number | string;
};

const Services: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [form, setForm] = useState({ nome: "", descricao: "", preco: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 20;

  const API_URL = import.meta.env.VITE_API_URL;
  const apiUrl = `${API_URL}/api/servico`;

  const fetchServicos = async () => {
    try {
      const res = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServicos(res.data);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    }
  };

  useEffect(() => {
    fetchServicos();
  }, []);

  const openModal = (servico: Servico) => {
    setEditingServico(servico);
    setForm({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: Number(servico.preco),
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingServico(null);
    setForm({ nome: "", descricao: "", preco: 0 });
  };

  const handleSave = async () => {
    if (!form.nome.trim()) {
      alert("O nome do serviço é obrigatório.");
      return;
    }

    try {
      await axios.put(`${apiUrl}/${editingServico?.id}`, form, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      closeModal();
      fetchServicos();
    } catch (err) {
      console.error("Erro ao salvar serviço:", err);
      alert("Erro ao salvar serviço.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Deseja realmente remover este serviço?")) return;

    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setServicos((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Erro ao remover serviço:", err);
      alert("Erro ao remover serviço.");
    }
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentItems = servicos.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(servicos.length / perPage);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-dark m-0">
          <FaPlus className="me-2 text-success" /> Lista de Serviços
        </h4>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover responsive size="sm">
          <thead className="table-light text-center">
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço (€)</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">Nenhum serviço encontrado.</td>
              </tr>
            ) : (
              currentItems.map((s) => (
                <tr key={s.id}>
                  <td className="text-center">{s.id}</td>
                  <td>{s.nome}</td>
                  <td>{s.descricao}</td>
                  <td>{Number(s.preco).toFixed(2)}</td>
                  <td className="text-center">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                      <Button variant="outline-primary" size="sm" className="me-2" onClick={() => openModal(s)}><FaEdit /></Button>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip>Remover</Tooltip>}>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(s.id)}><FaTrash /></Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

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

      {editingServico && (
        <ServiceModal
          show={showModal}
          onClose={closeModal}
          onSave={handleSave}
          form={form}
          setForm={setForm}
          isEditing={true}
        />
      )}
    </div>
  );
};

export default Services;
