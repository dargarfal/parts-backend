const express = require("express");
const auth = require("../middleswares/auth");
const router = express.Router();
const { check } = require("express-validator");
const partController = require("../controllers/partsControllers");

//Add new Part
router.post(
  "/",
  auth,
  [
    check("namePart", "El nombre de la pieza es obligatorio").not().isEmpty(),
    check("codePart", "El código de la pieza es obligatorio").not().isEmpty(),
    check("pricePart", "El precio es un número").isNumeric(),
  ],
  partController.addNewPart
);

//Get all parts
router.get("/", auth, partController.getAllParts);

//Get a part
router.get("/:id", auth, partController.getPart);

//Update part
router.put("/:id", auth, partController.updatePart);

//Get all parts of a car
router.get("/car/:id", auth, partController.getPartsOfCar);

module.exports = router;
