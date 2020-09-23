const User = require("../models/User");
require("dotenv").config({ path: ".env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { token } = require("morgan");

//api/login - post
exports.loginUser = async (req, res, next) => {
  //revisando si hay errores por express-validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(406).json({ errores: errores.array() });
  }

  const { userName, userPass } = req.body;

  const user = await User.findOne({ userName: userName });

  if (user) {
    const match = await bcrypt.compare(userPass, user.userPass);

    if (match) {
      const payload = {
        id: user._id,
        role: user.userRole,
      };

      //Access
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: 36000 }, //10 hour
        (error, token) => {
          if (error) {
            res.status(400).send(error);
          } else {
            res.status(200).json({ msg: "Acceso", token });
          }
        }
      );
    } else {
      res.status(400).json({ msg: "Contraseña incorrecta" });
    }
  } else {
    res.status(400).json({ msg: "El usuario no existe " });
  }
};

exports.obtenerUsuarioAutenticado =  async (req, res, next) => {
  
  let usuarioUp

  try {
    const usuario = await User.findById(req.userid).select('-userPass');
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).send(error);
  }
}