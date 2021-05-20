const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: [true, "El tipo es obligatorio"]
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

CategorySchema.methods.toJSON = function () {
  const { __v, _id, ...category } = this.toObject();
  category.uid = _id;
  return category;
}
module.exports = model('Category', CategorySchema);