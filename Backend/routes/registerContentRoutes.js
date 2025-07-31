const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerContentController');

// ✅ A rota externa já é "/api/register-content", então aqui é só "/"
router.get('/', controller.getRegisterContent);
router.put('/', controller.updateRegisterContent);

module.exports = router;
