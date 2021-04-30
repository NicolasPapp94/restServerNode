const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      msg: "El token no es valido"
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET); 
    const userVal = await User.findById(uid);
    
    if (!userVal) {
      return res.status(401).json({
        msg: 'El token no es valido'
      })
    }

    req.userVal = userVal;

    if (!userVal.state) {
      return res.status(401).json({
        msg: 'El token no es valido'
      })
    }


    
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: "El token no es valido"
    })
  }
}

module.exports = {
    validateJWT
}