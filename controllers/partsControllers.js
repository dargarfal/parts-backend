const Part = require('../models/Part');
const Car = require('../models/Car');
const { validationResult } = require('express-validator');

//api/pats - post - Add new part
exports.addNewPart = async (req, res, next) => {

  ///Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

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

//api/parts - get - Get all parts
exports.getAllParts = async (req, res, next) => {

  try {
    const parts = await Part.find({})
                              .populate({
                                path: 'ownercarPart',
                                select: 'brandCar modelCar yearCar'
                              });
    res.status(200).json(parts);  
  } catch (error) {
    res.status(400).json(error);
    next();
  }
}

//

//api/parts/:id - get - Get a part
exports.getPart = async (req, res, next) => {

  try {
    const part = await Part.findOne({_id: req.params.id})
                              .populate({
                                path: 'ownercarPart',
                                select: 'brandCar modelCar yearCar locationCar enabledCar finishedCar'
                              });

    if(part){
      res.status(200).json(part);  
    }else{
      res.status(400).json({ msg: 'La pieza no existe'});
    }
    
  } catch (error) {
    res.status(400).json(error);
    next();
  }
}

//api/parts/:id - update - Update a part
exports.updatePart = async (req, res, next) => {
  
  try {
    const updatepart = await Part.findOne({_id: req.params.id});

    if(updatepart){
      await Part.findByIdAndUpdate({_id: updatepart._id}, req.body);
      res.status(200).json({ msg: 'Pieza actualizada correctamente'});
    }else{
      res.status(400).json({ msg: 'La pieza no existe'});
    }

  } catch (error) {
    res.status(400).json(error);
    next();
  }
 
}

//api/parts/car/:idcar
exports.getPartsOfCar = async (req, res, next) => {

  try {
    const car = await Car.findOne({_id: req.params.id});

    if(car){
      const parts = await Part.find({ownercarPart: car._id})
      res.status(200).json(parts);
    }else{
      res.status(400).json({ msg: 'El auto no existe'});
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
}