import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

type ServiceForm = {
  nome: string;
  descricao: string;
  preco: string | number;
};

type ServiceModalProps = {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  form: ServiceForm;
  setForm: React.Dispatch<React.SetStateAction<ServiceForm>>;
  isEditing: boolean;
  editingItem?: any;
};

const ServiceModal: React.FC<ServiceModalProps> = ({
  show,
  onClose,
  onSave,
  form,
  setForm,
  isEditing,
  editingItem,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.nome.trim() || !form.descricao.trim() || !form.preco) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const precoConvertido = parseFloat(
      form.preco.toString().replace(",", ".")
    );

    if (isNaN(precoConvertido)) {
      alert("Preço inválido.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      preco: precoConvertido,
    }));

    onSave();
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-warning">
        <Modal.Title>{isEditing ? "Editar Serviço" : "Novo Serviço"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="nome">
            <Form.Label>Nome do Serviço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: Corte Feminino"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="descricao" className="mt-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Breve descrição do serviço"
              name="descricao"
              rows={3}
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="preco" className="mt-3">
            <Form.Label>Preço (€)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: 25.00"
              name="preco"
              value={form.preco}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEditing ? "Guardar Alterações" : "Criar Serviço"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
