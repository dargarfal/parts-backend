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
    
    if (checkUser !== null) {
      return res.status(400).json({ msg: "Este usuario ya se encuentra registrado" });
    }
    
    const resp = await user.save();
    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json(error);
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
    const users = await User.find({}).select("-userPass");
    res.status(200).json(users);
  } catch (error) {
    res.status(406).json(error);
  }
};

//api/users/:id - put - update user
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

      if (userupdate.userName !== req.body.userName) {
        userupdate.userName = req.body.userName;
      }

      if (userupdate.userRole !== req.body.userRole) {
        userupdate.userRole = req.body.userRole;
      }

      if (userupdate.fulluserName !== req.body.fulluserName) {
        userupdate.fulluserName = req.body.fulluserName;
      }
      if (req.body.userPass !== "") {
        const salts = await bcrypt.genSalt(10);
        userupdate.userPass = await bcrypt.hash(req.body.userPass, salts);
      }

      const updateuser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        userupdate,
        { new: true }
      ).select("-userPass");
      
      res.status(200).json(updateuser);
    } else {
      res.status(400).json({
        msg: "El usuario no tiene permisos para realizar esta acción",
      });
    }
  } else {
    res.status(400).json({ msg: "El usuario no exite" });
  }
};

//Hacer ruta para habilitar y desabilitar Usuario
exports.enableUser = async (req, res, next) => {

  try {
    const user = await User.findOne({_id: req.params.id});
    
    if(user){
      if(user.userEnable){
        user.userEnable = false;
      }else{
        user.userEnable = true;
      }
      
      const newuser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        user,
        { new: true }
      ).select("-userPass");
      res.status(200).json(newuser);
    }else{
      res.status(400).json({ msg: 'El usuario no existe'});
    }
  } catch (error) {
    res.status(400).json(error);
    next();
  }
  
  


}

exports.changePassword = async (req, res, next) => {

  //Check errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(406).json({ errors: errors.array() });
  }

  const { userPass, newuserPass } = req.body;

  if(req.userid === req.params.id){
    try {
      const user = await User.findOne({ _id: req.params.id });
  
      if(user){
  
        const match = await bcrypt.compare(userPass, user.userPass);
  
        if(match){
  
          const salts = await bcrypt.genSalt(10);
          user.userPass = await bcrypt.hash(newuserPass, salts);
          
          const newuser = await User.findByIdAndUpdate(
            { _id: req.params.id },
            user,
            { new: true }
          ).select("-userPass");
          res.status(200).json(newuser);
        }else{
          res.status(400).json({ msg: "Contraseña actual incorrecta" });
        }
  
      }else{
        res.status(400).json({ msg: "El usuario no existe " });
      }
      
    } catch (error) {
      res.status(400).json(error);
      next();
    }
  }else{
    res.status(400).json({ msg: "Acceso denegado. usuario no propietario" });
  }

 
}
 