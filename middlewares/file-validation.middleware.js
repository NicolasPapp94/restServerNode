const { request, response } = require("express");

const fileValidation = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json('No hay archivos para subir');
    return;
  } 
  next();
}


module.exports = {
  fileValidation
}