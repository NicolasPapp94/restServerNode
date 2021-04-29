const { response, request } = require('express');
const User = require('../models/user');
const crypto = require('bcryptjs');

const userGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { state: true };


  const [total, users] = await Promise.all([
    User.countDocuments(condition),
    User.find(condition)
    .skip(Number(from))
    .limit(Number(limit))
  ]);


  res.json({
    msg: "Get from API - Controller",
    total,
    users
  })
}

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  
  // Encriptar la pass
  const salt = crypto.genSaltSync();
  user.password = crypto.hashSync(password, salt);
  // Guardar DB
  await user.save();
  res.json({
    msg: "Post from API - Controller",
    user
  })
}

const userPut = async (req = request, res) => {
  const { userID } = req.params;
  const { password, google, _id, ...dataUpdate } = req.body;

  if ( password ) {
    const salt = crypto.genSaltSync();
    dataUpdate.password = crypto.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(userID, dataUpdate);

  res.json({
    msg: "Put from API - Controller",
    userDB
  })
}

const userDelete = async(req, res) => {
  const { userID } = req.params;
  
  const deletedUser = await User.findByIdAndUpdate(userID, { state: false });

  res.json({
    msg: "Delete from API - Controller",
    deletedUser
  })
}

const userPatch = (req, res) => {
  res.json({
    msg: "Patch from API - Controller"
  })
}


module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
}