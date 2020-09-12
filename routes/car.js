const express = require('express');
const auth = require('../middleswares/auth');
const router = express.Router();
const carConstroller = require('../controllers/carsController');
const { check } = require('express-validator');

//Add new Car
router.post('/', auth, carConstroller.addNewCar);

module.exports = router;
