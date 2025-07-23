const { Pricing, PricingTitle } = require("../models");

module.exports = {
  // GET /api/pricing → Devolve título e lista de preços
  async getAll(req, res) {
    try {
      const items = await Pricing.findAll({ order: [["id", "ASC"]] });
      const titleData = await PricingTitle.findOne();
      const title = titleData ? titleData.title : "Tabela de Preços";

      return res.json({ title, items });
    } catch (err) {
      console.error("Erro no getAll:", err);
      return res.status(500).json({ message: "Erro ao buscar preçário" });
    }
  },

  // PUT /api/pricing → Atualiza título e os itens
  async updateAll(req, res) {
    try {
      const { title, items } = req.body;

      // Atualiza ou cria o título
      const existingTitle = await PricingTitle.findOne();
      if (existingTitle) {
        await existingTitle.update({ title });
      } else {
        await PricingTitle.create({ title });
      }

      // Atualiza ou cria os itens
      for (const item of items) {
        if (item.id) {
          await Pricing.update(item, { where: { id: item.id } });
        } else {
          await Pricing.create(item);
        }
      }

      return res.json({ message: "Preçário atualizado com sucesso!" });
    } catch (err) {
      console.error("Erro no updateAll:", err);
      return res.status(500).json({ message: "Erro ao atualizar preçário" });
    }
  },

  // POST /api/pricing/items → Criar novo item
  async createItem(req, res) {
    try {
      const newItem = await Pricing.create(req.body);
      return res.status(201).json(newItem);
    } catch (err) {
      console.error("Erro ao criar item:", err);
      return res.status(500).json({ message: "Erro ao criar item." });
    }
  },

  // PUT /api/pricing/items/:id → Atualizar item
  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Pricing.update(req.body, { where: { id } });

      if (updated === 0) return res.status(404).json({ message: "Item não encontrado" });

      return res.json({ message: "Item atualizado com sucesso" });
    } catch (err) {
      console.error("Erro ao atualizar item:", err);
      return res.status(500).json({ message: "Erro ao atualizar item" });
    }
  },

  // DELETE /api/pricing/items/:id → Apagar item
  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Pricing.destroy({ where: { id } });

      if (deleted === 0) return res.status(404).json({ message: "Item não encontrado" });

      return res.json({ message: "Item removido com sucesso" });
    } catch (err) {
      console.error("Erro ao apagar item:", err);
      return res.status(500).json({ message: "Erro ao apagar item" });
    }
  },
};
