const express = require('express');
const router = express.Router();
const controller = require('../controllers/registerContentController');

router.get('/register-content', controller.getRegisterContent);
router.put('/register-content', controller.updateRegisterContent);

module.exports = router;


