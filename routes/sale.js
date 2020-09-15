const express = require("express");
const auth = require("../middleswares/auth");
const router = express.Router();
const saleController = require("../controllers/salesControllers");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [check("amountSale", "El precio es un número").isNumeric()],
  saleController.addNewSale
);

router.get("/", auth, saleController.getAllSales);

router.get("/:id", auth, saleController.getOneSale);

module.exports = router;
