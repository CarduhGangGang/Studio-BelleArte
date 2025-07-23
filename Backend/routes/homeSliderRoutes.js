const express = require("express");
const router = express.Router();
const { HomeSlide } = require("../models");
const upload = require("../middleware/upload"); // ✅ Certifica-te que o caminho está correto!
const path = require("path");

// 📦 GET ALL
router.get("/", async (req, res) => {
  const slides = await HomeSlide.findAll({ order: [["order", "ASC"]] });
  res.json(slides);
});

// 🆕 CREATE
router.post("/", async (req, res) => {
  try {
    const slide = await HomeSlide.create(req.body);
    res.json(slide);
  } catch (err) {
    console.error("❌ Erro ao criar slide:", err);
    res.status(500).json({ error: "Erro ao criar slide" });
  }
});

// ✏️ UPDATE
router.put("/:id", async (req, res) => {
  try {
    const slide = await HomeSlide.findByPk(req.params.id);
    if (!slide) return res.status(404).json({ error: "Slide não encontrado" });

    await slide.update(req.body);
    res.json(slide);
  } catch (err) {
    console.error("❌ Erro ao atualizar slide:", err);
    res.status(500).json({ error: "Erro ao atualizar slide" });
  }
});

// ❌ DELETE
router.delete("/:id", async (req, res) => {
  try {
    await HomeSlide.destroy({ where: { id: req.params.id } });
    res.json({ message: "Slide removido" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao apagar slide" });
  }
});

// 📤 UPLOAD DE IMAGEM
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Nenhum ficheiro enviado." });
  }

  const imageUrl = "/uploads/" + req.file.filename;
  res.json({ imageUrl });
});

module.exports = router;
