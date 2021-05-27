const { response, request } = require('express');
const { Product } = require('../models/index.models');

const productsGet = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const condition = { state: true };

  const [total, products] = await Promise.all([
    Product.countDocuments(condition),
    Product.find(condition)
      .populate('userID', 'name')
      .populate('categoryID','name')
      .skip(Number(from))
      .limit(Number(limit))
  ]);

  res.json({
    msg: "Get Products from API - Controller",
    total,
    products
  })
}

const productsGetByID = async (req = request, res = response) => {

  const { ProductID } = req.params;
  const product = await Product.findById(ProductID)
    .populate('userID', 'name')
    .populate('categoryID','name')

  res.json({
    msg: "Get Products by ID from API - Controller",
    product
  })
}


const productsPost = async (req = request, res = response) => {
  // const { name, price = 0, description = '', state, available = true, CategoryID } = req.body;
  const { state, userID, name, ...body } = req.body;
  

  const productsDB = await Product.findOne({ name });
  
  if (productsDB) {
    return res.status(400).json({
      msg: `El producto: ${name} ya existe`
    })
  }
  const data = {
    ...body,
    name: name.toUpperCase(),
    userID: req.userVal._id
  }

  const product = new Product(data);
  product.save();

  res.status(201).json({
    msg: "Post Products from API - Controller",
    product
  })
}

const productsPut = async (req = request, res = response) => {
  const { productID } = req.params;
  const { state, ...body } = req.body;
  const productName = body.name;
  const productDB = await Product.findOne({name: productName});
  
  if (productDB) {
    return res.status(400).json({
      msg: `El producto: ${productName} ya existe`
    })
  }

  if (body.name) {
    body.name = body.name.toUpperCase();
  }

  const data = {
    ...body,
    userID: req.userVal._id
  }
  const updatedProduct = await Product.findByIdAndUpdate(productID, data);

  res.json({
    msg: "Put Products from API - Controller",
    updatedProduct,
    body
  })
}

const productsDelete = async (req = request, res = response) => {
  const { productID } = req.params;
  const userVal = req.userVal;
  const deletedProduct = await Product.findByIdAndUpdate(productID, { state: false, userID: userVal._id });
  
  res.json({
    msg: "Delete Products from API - Controller",
    deletedProduct,
  });
}



module.exports = {
  productsGet,
  productsGetByID,
  productsPost,
  productsPut,
  productsDelete
}