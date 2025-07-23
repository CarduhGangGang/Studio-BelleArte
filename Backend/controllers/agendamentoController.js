const Joi = require("joi");
const db = require("../models");

// 📋 LISTAR TODOS OS AGENDAMENTOS
const agendamento_list = async (req, res) => {
  try {
    const agendamentos = await db.Agendamento.findAll({
      include: [
        { model: db.Utilizador, as: "cliente", attributes: ["id", "nome"] },
        { model: db.Utilizador, as: "colaborador", attributes: ["id", "nome"] },
        { model: db.Servico, as: "servico", attributes: ["id", "nome"] },
      ],
      order: [["data_hora", "ASC"]],
    });

    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ mensagem: "Erro ao buscar agendamentos." });
  }
};

// 🔍 DETALHES DE UM AGENDAMENTO
const agendamento_detail = async (req, res) => {
  try {
    const agendamento = await db.Agendamento.findByPk(req.params.id, {
      include: [
        { model: db.Utilizador, as: "cliente", attributes: ["id", "nome"] },
        { model: db.Utilizador, as: "colaborador", attributes: ["id", "nome"] },
        { model: db.Servico, as: "servico", attributes: ["id", "nome"] },
      ],
    });

    if (!agendamento) {
      return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    res.json(agendamento);
  } catch (error) {
    console.error("Erro ao buscar agendamento:", error);
    res.status(500).json({ mensagem: "Erro ao buscar agendamento." });
  }
};

// ➕ CRIAR NOVO AGENDAMENTO
const agendamento_create = async (req, res) => {
  try {
    const schema = Joi.object({
      data_hora: Joi.date().iso().required(),
      colaborador_id: Joi.number().integer().required(),
      servico_id: Joi.number().integer().required(),
      cliente_id: Joi.number().integer().required(),
      estado: Joi.string().valid("pendente", "em andamento", "concluido", "cancelado", "reagendado"),
      coluna: Joi.string().valid("Semana", "EmAndamento", "Concluido"),
    });

    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        mensagem: "Erro de validação.",
        detalhes: error.details.map((e) => e.message),
      });
    }

    const cliente = await db.Utilizador.findByPk(value.cliente_id);
    if (!cliente) {
      return res.status(404).json({ mensagem: "Cliente não encontrado." });
    }

    const novoAgendamento = await db.Agendamento.create({
      ...value,
      telefone_cliente: cliente.telefone || null,
    });

    const agendamentoCompleto = await db.Agendamento.findByPk(novoAgendamento.id, {
      include: [
        { model: db.Utilizador, as: "cliente", attributes: ["id", "nome"] },
        { model: db.Utilizador, as: "colaborador", attributes: ["id", "nome"] },
        { model: db.Servico, as: "servico", attributes: ["id", "nome"] },
      ],
    });

    res.status(201).json(agendamentoCompleto);
  } catch (err) {
    console.error("❌ Erro ao criar agendamento:", err);
    res.status(500).json({
      mensagem: "Erro ao criar agendamento.",
      erro: err.message || "Erro desconhecido",
    });
  }
};

// ✏️ ATUALIZAR AGENDAMENTO
const agendamento_update = async (req, res) => {
  try {
    const agendamento = await db.Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ mensagem: "Agendamento não encontrado" });
    }

    const user = req.user;

    if (user?.role === 2 && agendamento.colaborador_id !== user.id) {
      return res.status(403).json({ mensagem: "⛔ Acesso negado" });
    }

    const schema = Joi.object({
      data_hora: Joi.date().iso(),
      colaborador_id: Joi.number().integer(),
      servico_id: Joi.number().integer(),
      cliente_id: Joi.when(Joi.ref("$userRole"), {
        is: 3,
        then: Joi.forbidden(),
        otherwise: Joi.number().integer(),
      }),
      estado: Joi.string().valid("pendente", "em andamento", "concluido", "cancelado", "reagendado"),
      coluna: Joi.string().valid("Semana", "EmAndamento", "Concluido"),
    });

    const { error, value } = schema.validate(req.body, {
      context: { userRole: user?.role },
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        mensagem: "Erro de validação.",
        detalhes: error.details.map((e) => e.message),
      });
    }

    await agendamento.update(value);

    const atualizado = await db.Agendamento.findByPk(agendamento.id, {
      include: [
        { model: db.Utilizador, as: "cliente", attributes: ["id", "nome"] },
        { model: db.Utilizador, as: "colaborador", attributes: ["id", "nome"] },
        { model: db.Servico, as: "servico", attributes: ["id", "nome"] },
      ],
    });

    res.json(atualizado);
  } catch (err) {
    console.error("Erro ao atualizar agendamento:", err);
    res.status(400).json({ mensagem: "Erro ao atualizar agendamento." });
  }
};

// 🗑️ ELIMINAR AGENDAMENTO
const agendamento_delete = async (req, res) => {
  try {
    const agendamento = await db.Agendamento.findByPk(req.params.id);
    if (!agendamento) {
      return res.status(404).json({ mensagem: "Agendamento não encontrado." });
    }

    await agendamento.destroy();
    res.json({ mensagem: "✅ Agendamento eliminado com sucesso" });
  } catch (error) {
    console.error("Erro ao eliminar agendamento:", error);
    res.status(500).json({ mensagem: "Erro ao eliminar agendamento." });
  }
};

// ✅ CRIAR INDISPONIBILIDADE
const criarIndisponibilidade = async (req, res) => {
  try {
    const { data_hora, motivo } = req.body;
    const colaborador_id = req.user.id;

    const novoAgendamento = await db.Agendamento.create({
      data_hora,
      colaborador_id,
      tipo: "indisponibilidade",
      motivo,
    });

    res.status(201).json(novoAgendamento);
  } catch (err) {
    console.error("Erro ao criar indisponibilidade:", err);
    res.status(500).json({ erro: "Erro ao criar indisponibilidade" });
  }
};

module.exports = {
  agendamento_list,
  agendamento_detail,
  agendamento_create,
  agendamento_update,
  agendamento_delete,
  criarIndisponibilidade,
};
