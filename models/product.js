const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligarorio"],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "El tipo es obligatorio"]
  },
  price: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ''
  },
  available: {
    type: Boolean,
    default: true
  },
  categoryID: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

ProductSchema.methods.toJSON = function () {
  const { __v, _id, state ,...product } = this.toObject();
  product.uid = _id;
  return product;
}

module.exports = model('Product', ProductSchema);