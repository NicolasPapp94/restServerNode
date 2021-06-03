const { response, request } = require('express');
const fs = require('fs');
const path = require('path');
var cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);


const { uploadFileWithParams } = require('../helpers/uploadFile.helper');
const { User, Product } = require('../models/index.models');


const updateImage = async (req = request, res = response) => {
  const { colection, ID } = req.params;

  let model;

  switch (colection) {
    case 'users':
      model = await User.findById(ID);
       if (!model) {
        res.status(400).json({
          msg: `No se encuentra Usuario para el id ${ID}`
        })
      }
    break;
    case 'products':
      model = await Product.findById(ID);
      if (!model) {
        res.status(400).json({
          msg: `No se encuentra Producto para el id ${ID}`
        })
      }
      break
    default:
      res.status(500).json({
        msg: `La colection ${colection} no se puede operar`
      });
    break;
  }

  if (model.image) {
    const imagePath = path.join(__dirname, '../uploadedFiles', colection, model.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }


  const fileName = await uploadFileWithParams(req.files, undefined, colection);
  model.image = fileName;
  savedModel = await model.save();

  res.json({
    colection,
    ID,
    savedModel,
    fileName
  })
}


const getFile = async (req = request, res = response) => {
  
  const {colection, ID} = req.params
  
  let model;

  switch (colection) {
    case 'users':
      model = await User.findById(ID);
      if (!model) {
        res.status(400).json({
          msg: `No se encuentra Usuario para el id ${ID}`
        })
      }
   
    break;
    case 'products':
      model = await Product.findById(ID);
      if (!model) {
        res.status(400).json({
          msg: `No se encuentra Producto para el id ${ID}`
        })
      }
      break
    default:
      res.status(500).json({
        msg: `La colection ${colection} no se puede operar`
      });
    break;
  }


  if (model.image) {
    const imagePath = path.join(__dirname, '../uploadedFiles', colection, model.image);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath)
    }
  }
  
  const placeholderPath = path.join(__dirname,'../assets/no-image.jpg')
  return res.sendFile(placeholderPath)
}


const updateImageCloud = async (req = request, res = response) => {
  const { colection, ID } = req.params;

  let model;

  switch (colection) {
    case 'users':
      model = await User.findById(ID);
       if (!model) {
        res.status(400).json({
          msg: `No se encuentra Usuario para el id ${ID}`
        })
      }
    break;
    case 'products':
      model = await Product.findById(ID);
      if (!model) {
        res.status(400).json({
          msg: `No se encuentra Producto para el id ${ID}`
        })
      }
      break
    default:
      res.status(500).json({
        msg: `La colection ${colection} no se puede operar`
      });
    break;
  }

  if (model.image) {
    const tempName = model.image.split('/');
    const name = tempName[tempName.length - 1];
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.image = secure_url;
  savedModel = await model.save();

  
  res.json({
    colection,
    ID,
    savedModel
  })
}


module.exports = {
  updateImage,
  getFile,
  updateImageCloud
}