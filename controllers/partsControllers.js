const Part = require('../models/Part');
const Car = require('../models/Car');
const { validationResult } = require('express-validator');

//api/pats - post - Add new part
exports.addNewPart = async (req, res, next) => {

  const { ownercarPart } = req.body;
  console.log(ownercarPart);
  const testOwnerCar = await Car.findOne({_id: ownercarPart});

  req.body.userCreate = req.userid;

  const newPart = new Part(req.body);
 
  try {
    if(testOwnerCar !== null){
      const part = await newPart.save();
      testOwnerCar.partsCar.push(part._id);
      await Car.findByIdAndUpdate({_id: testOwnerCar.id}, testOwnerCar);
      res.status(200).json({ msg: 'Parte y pieza agregada correctamente'});
    }else{
      res.status(400).json({ msg: 'El auto no exite'});
    }
  } catch (error) {
    res.status(406).json(error);
    next();
  }
  
}