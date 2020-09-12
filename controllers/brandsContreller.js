const Brand = require('../models/Brand');
const { validationResult } = require('express-validator');

//api/brands - post - Add new Brand
exports.addNewBrand = async (req, res, next) => {

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(405).json({ errores: errores.array() });
  }

  const { nameBrand } = req.body;

  const brand = new Brand(req.body);

  const test = await Brand.findOne({nameBrand});

  try {
    if(test){
      return res.status(400).json({ msg: 'La marca ya existe'});
    }else{
      await brand.save();
      res.status(200).json({ msg: 'Marca creada correctamente'});
    }
  } catch (error) {
    res.status(400).json(error);
    next()
  }
  
}

//api/brands - get - Get all brands
exports.getAllBrands = async (req, res, next) => {

  try {
    const brands = await Brand.find({});
    res.status(200).json(brands);
  } catch (error) {
    res.status(406).json(error);
    next()
  }

}


//api/brands/:id - put - Update a brand
exports.UpdateBrand = async (req, res, next) => {


  const test = await Brand.findOne({_id: req.params.id});

  try {
    if(test){
      await Brand.findByIdAndUpdate({_id: req.params.id}, req.body);
      res.status(200).json({ msg: 'Marca actualizada correctamente'});
    }else{
      res.status(400).json({ msg: 'La marca no existe'});
    }
  } catch (error) {
    res.status(406).json(error);
    next()
  }
  

}

