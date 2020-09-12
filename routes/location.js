const express = require('express');
const auth = require('../middleswares/auth');
const router = express.Router();
const locationController = require('../controllers/locationsController');
const { check } = require('express-validator');


//Add new location
router.post('/',
auth, 
[
  check("nameLocation", "El nombre de la ubicación es obligatorio").not().isEmpty()
],
locationController.addNewLocation);

//Get all locations
router.get('/', auth, locationController.getAllLocations);

//Update location
router.put('/:id',
auth, 
[
  check("nameLocation", "El nombre de la ubicación es obligatorio").not().isEmpty()
],
locationController.updateLocation);

//Delete location
router.delete('/:id', auth, locationController.deleteLocation);

module.exports = router;