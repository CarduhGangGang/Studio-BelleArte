const db = require("../models");

// ✅ Guardar ou atualizar os horários de um colaborador
exports.guardarHorarios = async (req, res) => {
  const { colaborador_id, horarios } = req.body;

  if (!colaborador_id || !Array.isArray(horarios)) {
    return res.status(400).json({ erro: "Dados inválidos." });
  }

  try {
    // Apagar os horários antigos do colaborador
    await db.Horario.destroy({ where: { colaborador_id } });

    // Preparar os novos horários
    const novosHorarios = horarios.map((h) => ({
      dia: h.dia,
      entrada: h.entrada,
      saida: h.saida,
      colaborador_id,
    }));

    // Inserir em massa os novos horários
    const inseridos = await db.Horario.bulkCreate(novosHorarios);
    res.status(201).json(inseridos);
  } catch (err) {
    console.error("❌ Erro ao guardar horários:", err);
    res.status(500).json({ erro: "Erro ao guardar horários" });
  }
};

// ✅ Listar horários de um colaborador
exports.listarHorarios = async (req, res) => {
  const { colaborador_id } = req.params;

  if (!colaborador_id) {
    return res.status(400).json({ erro: "ID do colaborador não fornecido." });
  }

  try {
    const dados = await db.Horario.findAll({
      where: { colaborador_id },
      order: [["dia", "ASC"]],
    });

    res.json(dados);
  } catch (err) {
    console.error("❌ Erro ao listar horários:", err);
    res.status(500).json({ erro: "Erro ao listar horários" });
  }
};
