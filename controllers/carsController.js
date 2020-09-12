const Car = require('../models/Car');
const { validationResult } = require('express-validator');

//api/cars - post - Add new car
exports.addNewCar = async (req, res, next) => {
  
  const { plateCar, chasisCar } = req.body;

  const testPlate = await Car.findOne({plateCar});
  const testChasis = await Car.findOne({chasisCar});

  req.body.userCreate = req.userid;

  const newCar = new Car(req.body);  

  try {
    if(!testPlate){
      if(!testChasis){
        newCar.save();
        res.status(200).json({ msg: 'Auto creado correctamente'});
      }else{
        res.status(400).json({ msg: 'Ya existe un auto registrado con ese número de matricula'});
        next();
      }
    }else{
      res.status(400).json({ msg: 'Ya existe un auto registrado con ese número de matricula'});
      next();
    }
  } catch (error) {
    res.status(406).json(error);
    next();
  }
}