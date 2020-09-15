const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const User = require("../models/User");

module.exports = function (req, res, next) {
  let token = req.header("x-auth-token");

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) return res.status(400).send({ msg: "No tienes acceso jwt" });

      if (decoded.rol === "administrador") {
        next();
      } else res.status(400).send({ msg: "Este usuario no tienes acceso" });
    });
  } else
    res.status(400).send({ msg: "No tiene permisos de acceso a esta ruta" });
};
