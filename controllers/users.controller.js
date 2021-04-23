const { response, request } = require('express')

const userGet = (req = request, res = response) => {
  const qParams = req.query;
  // const {nombre = 'No name', apellido='No apellido'} = req.query

  res.json({
    msg: "Get from API - Controller",
    qParams
  })
}

const userPost = (req = request, res = response) => {
  const body = req.body;
  res.json({
    msg: "Post from API - Controller",
    body
  })
}

const userPut = (req = request, res) => {
  const userID = req.params.userID;
  res.json({
    msg: "Put from API - Controller",
    userID
  })
}

const userDelete = (req, res) => {
  res.json({
    msg: "Delete from API - Controller"
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