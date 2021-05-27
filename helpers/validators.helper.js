const { Category, Product } = require('../models/index.models');
const Role = require('../models/role');
const User = require('../models/user');

const roleValidate = async (role = '') => {
    const existeRol = await Role.findOne({ role });
      if (!existeRol) {
        throw new Error(`El rol ${role} no esta registrado en la BD`)
      }
}

const emailExist = async (email = '') => {
  const existeMail = await User.findOne({ email });
  if (existeMail) {
    throw new Error(`El mail: ${ email } esta registrado en la BD`)
  }
}

const idExist = async (id) => {
  const existeID = await User.findById(id);
  if (!existeID) {
    throw new Error(`El id: ${ id } no se encuentra en la BD`)
  }
}

const idCategoryExist = async (id) => {
  const existeID = await Category.findById(id);
  if (!existeID) {
    throw new Error(`El id: ${ id } no se encuentra en la BD`)
  }
}

const idProductExist = async (id) => {
  const existeID = await Product.findById(id);
  if (!existeID) {
    throw new Error(`El id: ${ id } no se encuentra en la BD`)
  }
}




module.exports = {
  roleValidate,
  emailExist,
  idExist,
  idCategoryExist,
  idProductExist
}