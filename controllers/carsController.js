const Car = require("../models/Car");
const { validationResult } = require("express-validator");

//api/cars - post - Add new car
exports.addNewCar = async (req, res, next) => {
  ///Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { plateCar, chasisCar } = req.body;

  const testPlate = await Car.findOne({ plateCar });
  const testChasis = await Car.findOne({ chasisCar });

  req.body.userCreate = req.userid;
  
  const newCar = new Car(req.body);
  console.log(newCar);
  try {
    if (!testPlate) {
      if (!testChasis) {
        const reply = await newCar.save();
        res.status(200).json(reply);
      } else {
        return res.status(400).json({
          msg: "Ya existe un auto registrado con ese número de matricula",
        });
      }
    } else {
      return res.status(400).json({
        msg: "Ya existe un auto registrado con ese número de matricula",
      });
    }
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
    next();
  }
};

//api/cars - get - Get all cars
exports.getAllCars = async (req, res, next) => {
  try {
    const cars = await Car.find({})
    /*.populate("brandCar")
    .populate("locationCar")*/;
    res.status(200).json(cars);
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/cars/:id - get - Get a car
exports.getCar = async (req, res, next) => {
  try {
    const car = await Car.findOne({ _id: req.params.id }).populate("partsCar").populate("brandCar").populate("locationCar");;
    if (car) {
      res.status(200).json(car);
    } else {
      res.status(400).json({ msg: "El auto no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/cars/:id - put - Update car
exports.updateCar = async (req, res, next) => {
  try {
    const updatecar = await Car.findOne({ _id: req.params.id });

    if (updatecar) {
      const reply = await Car.findByIdAndUpdate({ _id: updatecar._id }, req.body, { new: true });
      res.status(200).json(reply);
    } else {
      res.status(400).json({ msg: "El auto no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};
