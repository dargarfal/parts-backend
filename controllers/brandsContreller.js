const Brand = require("../models/Brand");
const Car = require('../models/Car');
const { validationResult } = require("express-validator");


//api/brands - post - Add new Brand
exports.addNewBrand = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { nameBrand } = req.body;

  const brand = new Brand(req.body);

  const test = await Brand.findOne({ nameBrand });

  try {
    if (test) {
      return res.status(400).json({ msg: "La marca ya existe" });
    } else {
      await brand.save();
      res.status(200).json({ msg: "Marca creada correctamente" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/brands - get - Get all brands
exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/brands/:id - put - Update a brand
exports.UpdateBrand = async (req, res, next) => {
  const test = await Brand.findOne({ _id: req.params.id });

  try {
    if (test) {
      
      if(req.body.nameBrand !== ''){
        test.nameBrand = req.body.nameBrand;
      }

      if(req.body.logoBrand !== ''){
        test.logoBrand = req.body,logoBrand;
      }


      await Brand.findByIdAndUpdate({ _id: req.params.id }, test);
      res.status(200).json({ msg: "Marca actualizada correctamente" });
    } else {
      res.status(400).json({ msg: "La marca no existe" });
    }
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/delete/:id - delete - Dele an Brand
exports.deleteBrand = async (req, res) => {
  const test = await Brand.findOne({ _id: req.params.id });

  try {
    if (test) {
      const car = Car.findOne({brandCar: test._id});

      if(!car){
        await Brand.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ msg: "Marca eliminada correctamente" });
      }else{
        res.status(400).json({ msg: 'Error. Esta Marca aun tiene autos asignados'})
      }
     
    } else {
      res.status(400).json({ msg: "La Marca no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

 