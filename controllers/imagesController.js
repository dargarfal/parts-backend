const Image = require("../models/Image");
const Car = require("../models/Car");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");
require("dotenv").config({ path: ".env" });
const fs = require("fs-extra");
const { findOne } = require("../models/Car");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//api/post/:idcar - post - Upload an image
exports.uploadImage = async (req, res, next) => {
  const image = req.file;

  try {
    if (image.mimetype === "image/jpeg" || image.mimetype === "image/png") {
      const car = await Car.findOne({ _id: req.params.id });

      if (car) {
        const result = await cloudinary.v2.uploader.upload(req.file.path);
        //console.log(result);
        //console.log(req.params.id);
        const newimage = new Image({
          publicidImage: result.public_id,
          uriImage: result.url,
          ownercarImage: req.params.id,
        });
        const saveimage = await newimage.save();
        res.status(200).json({ key: "Listo" });
        car.imagesCar.push(saveimage);
        await Car.findByIdAndUpdate({ _id: car.id }, car);
        await fs.unlink(image.path);
      } else {
        res.status(400).json({ msg: "El auto no existe" });
      }
    } else {
      res.status(503).json({ msg: "Tipo de archivo no permitido" });
    }
    console.log(req.file);
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/images/:id - delete - Delete an image
exports.deleteImage = async (req, res, next) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });

    if (image) {
      const car = await Car.findOne({ _id: image.ownercarImage });
      //console.log(car);
      const newlist = car.imagesCar.filter((imge) => imge != req.params.id);
     
      car.imagesCar = newlist;
      await Car.findByIdAndUpdate({ _id: car.id }, car);
      const reply = await Image.findByIdAndDelete(image._id);
      await cloudinary.v2.uploader.destroy(image.publicidImage);
      res.status(200).json(reply);
    } else {
      res.status(400).json({ msg: "La imagen no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/images/:idcar - get - Get all the images of a car
exports.getAllImagesCar = async (req, res, next) => {
  try {
    const car = await Car.findOne({ _id: req.params.id });

    if (car) {
      const images = await Image.find({ ownercarImage: car._id });
      res.status(200).json(images);
    } else {
      res.status(400).json({ msg: "El auto no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//api/images/:id - get - Get an image
exports.getImage = async (req, res, next) => {
  try {
    const image = await Image.findOne({ _id: req.params.id });

    if (image) {
      res.status(200).json(image);
    } else {
      res.status(400).json({ msg: "La imagen no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};
