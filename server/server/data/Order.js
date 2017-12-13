const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let orderSchema = new mongoose.Schema({
  creator: { type: ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'User' },
  product: { type: ObjectId, required: REQUIRED_VALIDATION_MESSAGE, ref: 'Product' },
  toppings: [{ type: String }],
  creationDate: { type: Date, default: Date.now() },
  status: { type: String, default: 'Pending' }
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order
