// UserModal.tsx
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  form: {
    nome: string;
    email: string;
    role_id: number;
    password: string;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      nome: string;
      email: string;
      role_id: number;
      password: string;
    }>
  >;
  isEditing: boolean;
};

const UserModal: React.FC<Props> = ({ show, onClose, onSave, form, setForm, isEditing }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: "#f8c41e" }}>
        <Modal.Title className="fs-5 text-dark">
          {isEditing ? "Editar Utilizador" : "Novo Utilizador"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </Form.Group>

          {!isEditing && (
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="sm"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Form.Group>
          )}

          <Form.Group>
            <Form.Label>Perfil</Form.Label>
            <Form.Select
              size="sm"
              value={form.role_id}
              onChange={(e) => setForm({ ...form, role_id: Number(e.target.value) })}
            >
              <option value={1}>Administrador</option>
              <option value={2}>Colaborador</option>
              <option value={3}>Cliente</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" size="sm" onClick={onSave}>
          {isEditing ? "Salvar" : "Criar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
