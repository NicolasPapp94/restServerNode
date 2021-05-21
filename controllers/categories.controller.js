const { response, request } = require('express');
const { Category } = require('../models/index.models');

const categoriesGet = async (req = request, res = response) => {
  
  const { limit = 5, from = 0 } = req.query;
  const condition = { state: true };
  const [total, categories] = await Promise.all([
    Category.countDocuments(condition),
    Category.find(condition)
    .populate('userID', 'name')
    .skip(Number(from))
    .limit(Number(limit))
  ]);

  res.json({
    msg: "Get Categories from API - Controller",
    total,
    categories
  })
}

const categoriesGetByID = async (req = request, res = response) => {
  const { CategoryID } = req.params;
  const category = await Category.findById(CategoryID).populate('userID', 'name');

  res.json({
    msg: "Get Categories by ID from API - Controller",
    category
  })
}

const categoriesPost = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Category.findOne({ name });
  
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria: ${name} ya existe`
    })
  }
  const data = {
    name,
    userID: req.userVal._id
  }

  const category = new Category(data);
  category.save();

  res.status(201).json({
    msg: "Post Categories from API - Controller",
    category
  })
}

const categoriesPut = async (req = request, res = response) => {
  const { CategoryID } = req.params;
  const userVal = req.userVal;
  const name = req.body.name.toUpperCase();
  const categoryDB = await Category.findOne({ name });
  
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria: ${name} ya existe`
    })
  }

  const updatedCategory = await Category.findByIdAndUpdate(CategoryID, { name, userID: userVal._id });


  res.json({
    msg: "Put Categories from API - Controller",
    updatedCategory
  })
}

const categoriesDelete = async (req = request, res = response) => {
  const { CategoryID } = req.params;
  const userVal = req.userVal;
  const deletedCategory = await Category.findByIdAndUpdate(CategoryID, { state: false, userID: userVal._id });
  
  res.json({
    msg: "Delete from API - Controller",
    deletedCategory,
  });
}



module.exports = {
  categoriesGet,
  categoriesPost,
  categoriesPut,
  categoriesDelete,
  categoriesGetByID
}