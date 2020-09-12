const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { check } = require('express-validator');
const auth = require('../middleswares/auth');

router.post('/',
[
  check("userName", "El usuario es obligatorio").not().isEmpty(),
  check("userPass", "El password debe contener mínimo 6 caracteres"
  ).isLength({ min: 6 })
],
loginController.loginUser
);

module.exports = router;