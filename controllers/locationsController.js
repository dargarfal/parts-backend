const Location = require("../models/Location");
const { validationResult } = require("express-validator");

const Car = require('../models/Car');

//api/locations - post - Add new Location
exports.addNewLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { nameLocation } = req.body;

  const location = new Location(req.body);

  const test = await Location.findOne({ nameLocation });

  try {
    if (test) {
      return res.status(400).json({ msg: "Esta ubicación ya existe" });
    } else {
      const reply = await location.save();
      res.status(200).json(reply);
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/locations - get - Get all locations
exports.getAllLocations = async (req, res, next) => {
  try {
    const locations = await Location.find({});
    res.status(200).json(locations);
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/locations/:id - put - Update a Location
exports.updateLocation = async (req, res) => {
  const test = await Location.findOne({ _id: req.params.id });

  try {
    if (test) {
      const reply = await Location.findByIdAndUpdate(
        { _id: req.params.id }, 
        req.body, 
        { new: true });
      res.status(200).json(reply);
    } else {
      res.status(400).json({ msg: "La Ubicación no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/locations/:id - delete - Delete an location
exports.deleteLocation = async (req, res) => {
  const test = await Location.findOne({ _id: req.params.id });

   try {
    if (test) {
      const car = await Car.findOne({locationCar: test._id});
    
      if(car){
        res.status(400).json({ msg: 'Error. Esta Ubicación aun tiene autos asignados'})
      }else{
        await Location.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "Ubicación eliminada correctamente" });
      }
     
    } else {
      res.status(400).json({ msg: "La Ubicación no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/locations/:id - Get - Get a Location
exports.getLocation = async (req, res) => {

  const test = await Location.findOne({ _id: req.params.id });

  try {
    if(test) {
      res.status(200).json(test);
    }else {
      res.status(400).json({ msg: "La Ubicacion solicitada no existe" });  
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
}
