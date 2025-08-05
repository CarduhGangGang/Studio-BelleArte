const express = require("express");
const router = express.Router();
const { HomeSlide } = require("../models");

// 📦 GET ALL
router.get("/", async (req, res) => {
  try {
    const slides = await HomeSlide.findAll({ order: [["order", "ASC"]] });
    res.json(slides);
  } catch (err) {
    console.error("❌ Erro ao buscar slides:", err);
    res.status(500).json({ error: "Erro ao buscar slides." });
  }
});

// 🆕 CREATE
router.post("/", async (req, res) => {
  try {
    const slide = await HomeSlide.create(req.body);
    res.status(201).json(slide);
  } catch (err) {
    console.error("❌ Erro ao criar slide:", err);
    res.status(500).json({ error: "Erro ao criar slide." });
  }
});

// ✏️ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const slide = await HomeSlide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ error: "Slide não encontrado." });

    await slide.update(req.body);
    res.json(slide);
  } catch (err) {
    console.error("❌ Erro ao atualizar slide:", err);
    res.status(500).json({ error: "Erro ao atualizar slide." });
  }
});

// ❌ DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await HomeSlide.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Slide não encontrado." });

    res.json({ message: "Slide removido com sucesso." });
  } catch (err) {
    console.error("❌ Erro ao apagar slide:", err);
    res.status(500).json({ error: "Erro ao apagar slide." });
  }
});

module.exports = router;
