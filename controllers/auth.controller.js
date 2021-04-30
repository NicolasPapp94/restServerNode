const { response, request } = require('express');
const User = require('../models/user');
const crypto = require('bcryptjs');
const { generateJWT } = require('../helpers/generatejwt.helper');

const loginPost = async (req = request, res = response) => {

  const { email, password } = req.body;
  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
          msg: "El usuario o la contraseña no son validos - mail"
      })
    }

    if (!user.state) {
      return res.status(400).json({
        msg: "El usuario o la contraseña no son validos - blocked"
      })
    }

    const validPassword = crypto.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El usuario o la contraseña no son validos - password"
      })
    }

    // Generar JWT
    const token = await generateJWT(user.id);
    
    res.json({
      msg: "Post from API - AuthController",
      user,
      token
    })
  
  } catch (error) {
    res.status(500).json({
      msg: "Algo salio mal. Intente nuevamente.",
    });
  }

 
}


module.exports = {
  loginPost
}