const { response, request } = require('express');
const User = require('../models/user');
const crypto = require('bcryptjs');
const { generateJWT } = require('../helpers/generatejwt.helper');
const { googleVerify } = require('../helpers/googleVerify.helper');
const user = require('../models/user');

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

const googleAuth = async (req = request, res = response) => {
  const { id_token } = req.body
  try {
    const { email, name, image } = await googleVerify(id_token);
    let usuario = await User.findOne({ email });
    if (!usuario) {
      const data = {
        name,
        email,
        password: 'G',
        image,
        google: true
      }
      usuario = new User(data);
      await usuario.save();
    }
    
    if (!usuario.state) {
      res.status(401).json({
         msg: "Hable con el admin. Usuario bloqueado"
       })
    }

     const token = await generateJWT(user.id);

    res.json({
      msg: "Google Sign-in, todo ok",
      usuario,
      token
    })
    
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "Token de Google no valido"
    })
  }

    
}


module.exports = {
  loginPost,
  googleAuth
}