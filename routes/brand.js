const express = require("express");
const auth = require("../middleswares/auth");
const router = express.Router();
const brandConstroller = require("../controllers/brandsContreller");
const { check } = require("express-validator");

//Add new brand
router.post(
  "/",
  auth,
  [check("nameBrand", "El nombre de la marca es obligatorio").not().isEmpty()],
  brandConstroller.addNewBrand
);

//Get all brands
router.get("/", auth, brandConstroller.getAllBrands);

//Update brand
router.put(
  "/:id",
  auth,
  brandConstroller.UpdateBrand
);

router.get('/:id', auth, brandConstroller.getOneBrand);

module.exports = router;
