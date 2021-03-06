const Location = require("../models/Location");
const { validationResult } = require("express-validator");

//api/locations - post - Add new Location
exports.addNewLocation = async (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(405).json({ errores: errores.array() });
  }

  const { nameLocation } = req.body;

  const location = new Location(req.body);

  const test = await Location.findOne({ nameLocation });

  try {
    if (test) {
      return res.status(400).json({ msg: "Esta ubicación ya existe" });
    } else {
      await location.save();
      res.status(200).json({ msg: "Ubicación creada correctamente" });
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
      await Location.findByIdAndUpdate({ _id: req.params.id }, req.body);
      res.status(200).json({ msg: "Ubicación actualizada correctamente" });
    } else {
      res.status(400).json({ msg: "La Ubicación no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/locations/:id - delete - Delete a location
exports.deleteLocation = async (req, res) => {
  const test = await Location.findOne({ _id: req.params.id });

  try {
    if (test) {
      await Location.findByIdAndDelete({ _id: req.params.id }, req.body);
      res.status(200).json({ msg: "Ubicación eliminada correctamente" });
    } else {
      res.status(400).json({ msg: "La Ubicación no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};
