const User = require("../models/User");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

//api/users - post - create new user
exports.newUser = async (req, res, next) => {
  //Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { userName } = req.body;

  const user = new User(req.body);

  try {
    const checkUser = await User.findOne({ userName });

    if (checkUser) {
      return res
        .status(400)
        .json({ msg: "Este usuario ya se encuentra registrado" });
    }

    await user.save();
    res.status(200).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/users/:id - delete - delete user
exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.findOneAndRemove({ _id: id });
    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/users/:id - get - get one user
exports.getOneUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-userPass");

    if (user !== null) {
      if (
        req.userid === user._id.toString() ||
        req.userRole === "administrador"
      ) {
        res.status(200).json(user);
      } else {
        res
          .status(400)
          .json({ msg: "Este usuario no tiene acceso a estos datos" });
      }
    } else {
      res.status(400).json({ msg: "El usuario no exite" });
    }
  } catch (error) {
    res.status(406).json(error);
    next();
  }
};

//api/users - get - get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(406).json(error);
  }
};

//api/users/:id - post - update user
exports.updateUser = async (req, res, next) => {
  //Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const userupdate = await User.findById(req.params.id);

  if (userupdate) {
    if (req.userRole === "administrador" || req.userid === userupdate.id) {
      if (userupdate.userEmail !== req.body.userEmail) {
        userupdate.userEmail = req.body.userEmail;
      }

      if (req.body.userPass !== "") {
        const salts = await bcrypt.genSalt(10);
        userupdate.userPass = await bcrypt.hash(req.body.userPass, salts);
      }

      const updateuser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        userupdate
      );
      res.status(200).json({ msg: "Datos actualizados correctamente" });
    } else {
      res
        .status(400)
        .json({
          msg: "El usuario no tiene permisos para realizar esta acción",
        });
    }
  } else {
    res.status(400).json({ msg: "El usuario no exite" });
  }
};
