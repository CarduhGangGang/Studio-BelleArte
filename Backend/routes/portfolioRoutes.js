const express = require("express");
const multer = require("multer");
const { autenticar, autorizar } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/portfolioController");

const upload = multer({ dest: "public/uploads/" });
const r = express.Router();

r.get("/section", ctrl.getSection);
r.put("/section", autenticar, autorizar(1), ctrl.updateSection);

r.get("/images", ctrl.getImages);
r.post("/images", autenticar, autorizar(1), upload.single("image"), ctrl.uploadImage);
r.delete("/images/:id", autenticar, autorizar(1), ctrl.deleteImage);

module.exports = r;
