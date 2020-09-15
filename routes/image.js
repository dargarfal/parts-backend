const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imagesController");
const auth = require("../middleswares/auth");

//api/images/:idcar - post - Upload image
router.post("/:id", auth, imageController.uploadImage);

//api/images - delete - Delele an image
router.delete("/:id", auth, imageController.deleteImage);

//api/images/:idcar - get - Get all the images of a car
router.get("/car/:id", auth, imageController.getAllImagesCar);

//api/images/:id - get - Get an image
router.get("/:id", auth, imageController.getImage);

module.exports = router;
