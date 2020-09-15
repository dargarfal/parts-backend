const Sale = require("../models/Sale");
const Car = require("../models/Car");
const Part = require("../models/Part");
const User = require("../models/User");
const { validationResult } = require("express-validator");

//api/sales - get - Add new sale
exports.addNewSale = async (req, res, next) => {
  ///Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { ownercarSale, ownerpartSale } = req.body;

  const sale = req.body;

  sale.owneruserSale = req.userid;

  try {
    const car = await Car.findOne({ _id: ownercarSale });

    if (car) {
      const part = await Part.findOne({ _id: ownerpartSale });
      if (part && part.statusPart !== "Vendida") {
        //Saving new sale
        const presale = new Sale(sale);
        const newsale = await presale.save();

        //Adding new sale to owner
        const user = await User.findOne({ _id: req.userid });
        user.userSales.push(newsale);
        await User.findByIdAndUpdate({ _id: user._id }, user);

        //Updating car sales amount
        car.currentsaleCar += newsale.amountSale;
        await Car.findByIdAndUpdate({ _id: car._id }, car);

        //Updating the status and real amount of the part to Sold
        part.statusPart = "Vendida";
        part.realsalepricePart = sale.amountSale;
        await Part.findByIdAndUpdate({ _id: part._id }, part);

        res.status(200).json({ msg: "Venta realizada con exito" });
      } else {
        res.status(400).json({ msg: "La pieza no exite o ya está vendida" });
      }
    } else {
      res.status(400).json({ msg: "El auto no exite" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//get/sales - get - Get all sale
exports.getAllSales = async (req, res, next) => {
  try {
    const sales = await Sale.find({})
      .populate({
        path: "ownercarSale",
        select: "brandCar modelCar yearCar",
      })
      .populate({
        path: "ownerpartSale",
        select: "namePart pricePart codePart",
      })
      .populate({
        path: "owneruserSale",
        select: "userName userRole",
      });
    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};

//get/sales/:id - get - Get a sale
exports.getOneSale = async (req, res, next) => {
  try {
    const sale = await Sale.findOne({ _id: req.params.id })
      .populate({
        path: "ownercarSale",
        select: "brandCar modelCar yearCar",
      })
      .populate({
        path: "ownerpartSale",
        select: "namePart pricePart codePart",
      })
      .populate({
        path: "owneruserSale",
        select: "userName userRole",
      });

    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(400).json({ msg: "La factura no existe" });
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
};
