const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/pricingController");

// GET título + itens
router.get("/", pricingController.getAll);

// PUT título + itens
router.put("/", pricingController.updateAll);

// Operações individuais nos itens
router.post("/items", pricingController.createItem);
router.put("/items/:id", pricingController.updateItem);
router.delete("/items/:id", pricingController.deleteItem);

module.exports = router;
