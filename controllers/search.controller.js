const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const {Product, User, Category} = require('../models/index.models');


const allowedColections = [
  'categories',
  'products',
  'roles',
  'users'
];

const findUsers = async (termino = '', res = response) => {

  const esMongoID = ObjectId.isValid(termino);
  
  if (esMongoID) {
    const usuario = await User.findById(termino);
    return res.json({
      results: (usuario) ? [usuario] : [] 
    })
  }

  const regexp = new RegExp(termino, 'i')

  const usuarios = await User.find({
    $or: [{ name: regexp }, { email: regexp }],
    $and: [{state: true}]
   });
    return res.json({
      results: usuarios
    })
}


const findProducts = async (termino = '', res = response) => {

  const esMongoID = ObjectId.isValid(termino);
  
  if (esMongoID) {
    const producto = await Product.findById(termino);
    return res.json({
      results: (producto) ? [producto] : [] 
    })
  }

  const regexp = new RegExp(termino, 'i')

  const productos = await Product.find({
    $or: [{ name: regexp }],
    $and: [{state: true}]
  });
  
  return res.json({
    results: productos
  })
}

const findCategories = async (termino = '', res = response) => {

  const esMongoID = ObjectId.isValid(termino);
  
  if (esMongoID) {
    const category = await Category.findById(termino);
    return res.json({
      results: (category) ? [category] : [] 
    })
  }

  const regexp = new RegExp(termino, 'i')

  const categories = await Category.find({
    $or: [{ name: regexp }],
    $and: [{state: true}]
  });
  
  return res.json({
    results: categories
  })
}


const search = async (req = request, res = response) => {

  const {colection, searchParam} = req.params

  if (!allowedColections.includes(colection)) {
    return res.status(400).json({msg: `Las colecciones permitidas son ${allowedColections}`})
  }

  switch (colection) {
    case 'categories':
      findCategories(searchParam,res)
    break;
    case 'products':
      findProducts(searchParam,res)
    break;
    case 'users':
      findUsers(searchParam, res);
    break;
    default:
      res.status(500).json({
        msg: 'Se me olvido hacer esta busqueda'
      });
    break;
  }
}

module.exports = {
  search
}