const express = require('express');
const auth = require('../middleswares/auth');
const router = express.Router();
const {check } = require('express-validator');
const partController = require('../controllers/partsControllers');

//Add new Part
router.post('/', auth, partController.addNewPart);

module.exports = router;
