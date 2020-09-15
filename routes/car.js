const express = require("express");
const auth = require("../middleswares/auth");
const router = express.Router();
const carConstroller = require("../controllers/carsController");
const { check } = require("express-validator");

//Add new Car
router.post(
  "/",
  auth,
  [
    check("brandCar", "La marca del auto es obligatoria").not().isEmpty(),
    check("modelCar", "La modelo del auto es obligatoria").not().isEmpty(),
    check("yearCar", "El año debe contener cuatro números").isLength(4),
    check(
      "plateCar",
      "La mátricula debe contener al menos 7 caracteres"
    ).isLength({ min: 7 }),
    check("priceCar", "El precio es un número").isNumeric(),
  ],
  carConstroller.addNewCar
);

//Get all cars
router.get("/", auth, carConstroller.getAllCars);

//Get a car
router.get("/:id", auth, carConstroller.getCar);

//Update car
router.put("/:id", auth, carConstroller.updateCar);

module.exports = router;
