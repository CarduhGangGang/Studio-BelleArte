const db = require("../models");

// ✅ Buscar todas as férias com info do colaborador
const getTodosHolidays = async (req, res) => {
  try {
    const ferias = await db.Holiday.findAll({
      include: [
        {
          model: db.Utilizador,
          as: "colaborador",
          attributes: ["id", "nome"],
        },
      ],
    });
    res.json(ferias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar todas as férias." });
  }
};

// ✅ Buscar férias de um colaborador específico
const getHolidaysPorColaborador = async (req, res) => {
  try {
    const { id } = req.params;
    const ferias = await db.Holiday.findAll({
      where: { colaborador_id: id },
      include: [
        {
          model: db.Utilizador,
          as: "colaborador",
          attributes: ["id", "nome"],
        },
      ],
    });
    res.json(ferias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar férias do colaborador." });
  }
};

// ✅ Criar novo registo de férias
const adicionarHoliday = async (req, res) => {
  try {
    const nova = await db.Holiday.create(req.body);
    res.status(201).json(nova);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar férias." });
  }
};

// ✅ Atualizar férias existentes
const atualizarHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Holiday.update(req.body, { where: { id } });
    res.json({ message: "Férias atualizadas com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar férias." });
  }
};

// ✅ Remover férias
const removerHoliday = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Holiday.destroy({ where: { id } });
    res.json({ message: "Férias removidas com sucesso." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao remover férias." });
  }
};

// ✅ Exportar as funções como objeto (CommonJS)
module.exports = {
  getTodosHolidays,
  getHolidaysPorColaborador,
  adicionarHoliday,
  atualizarHoliday,
  removerHoliday,
};
