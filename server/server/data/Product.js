const mongoose = require('mongoose')
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let productSchema = new mongoose.Schema({
  category: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  imageUrl: { type: String, required: REQUIRED_VALIDATION_MESSAGE },
  size: { type: Number, required: REQUIRED_VALIDATION_MESSAGE, min: 17, max: 24 },
  toppings: [{ type: String }],
  creationDate: { type: Date, default: Date.now() }
})

let Product = mongoose.model('Product', productSchema)

module.exports = Product
