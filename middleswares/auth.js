const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env'});
const User = require('../models/User');

//pass the id of the logged in user
module.exports = function (req, res, next){

  if(req.header('x-auth-token')){
    let token = req.header('x-auth-token');

    jwt.verify(token, process.env.SECRET_KEY, async(error, decoded) => {
      if(error) return res.status(400).send({ mensaje: "No tienes acceso" });

      //Verificando que el usuario existe
      const user = await User.findById(decoded.id);
      if(user === null) return res.status(400).send({ msg: "El usuario no exixte" });

      req.userid = decoded.id;
      req.userRole = user.userRole;
      next();
    })
  }else{
    return res.status(400).json({ msg: 'Usuario no autenticado'})
  }
}