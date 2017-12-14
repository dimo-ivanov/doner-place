const mongoose = require('mongoose')
const Order = mongoose.model('Order')
const Product = mongoose.model('Product')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  addGet: (req, res) => {
    let productId = req.params.id

    Product
      .findById(productId)
      .then(product => {
        if (!product) {
          res.locals.globalError = 'Product was not found.'
          res.render('/')
          return
        }

        res.render('orders/customize', product)
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('/')
      })
  },
  addPost: (req, res) => {
    let orderReq = req.body
    // let userId = req.user._id
    let userId = req.body.creator

    if (!orderReq.toppings) {
      orderReq.toppings = ''
    }

    Order
      .create({
        creator: userId,
        product: orderReq.product,
        toppings: orderReq.toppings
      })
      .then(order => {
        if (!order) {
          res.locals.globalError = 'Something went wrong. Please try again!'
          res.json({error: res.locals.globalError})
          // res.render('/', orderReq)
          return
        }

        // res.redirect(`/order/details/${order._id}`)
        res.json(order)
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.json({error: res.locals.globalError})
        // res.render('/', orderReq)
      })
  },
  detailsGet: (req, res) => {
    let reqId = req.params.id

    Order
      .findById(reqId)
      .populate('product')
      .then(order => {
        if (!order) {
          res.locals.globalError = 'Something went wrong. Please try again!'
          res.json({error: res.locals.globalError})
          // res.render('/')
          return
        }

        res.json({order: order})

        // res.render('orders/details', {
        //   order: order,
        //   helpers: {
        //     ifEquals: function (arg1, arg2, options) {
        //       return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
        //     },
        //     formatDate: (date) => {
        //       let day = date.getDate()
        //       let month = date.getMonth() + 1
        //       let year = date.getFullYear()

        //       return day + '/' + month + '/' + year
        //     }
        //   }
        // })
      })
  },
  statusGet: (req, res) => {
    let userId = req.user.id

    Order
      .find({ creator: userId })
      .sort('creationDate')
      .populate('product')
      .then(orders => {
        if (!orders) {
          res.locals.globalError = 'Something went wrong. Please try again!'
          res.json({error: res.locals.globalError})
          // res.render('/')
          return
        }

        res.json({orders: orders})

        // res.render('orders/status', {
        //   orders: orders,
        //   helpers: {
        //     ifEquals: function (arg1, arg2, options) {
        //       return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
        //     },
        //     formatDate: (date) => {
        //       let day = date.getDate()
        //       let month = date.getMonth() + 1
        //       let year = date.getFullYear()

        //       return day + '/' + month + '/' + year
        //     }
        //   }
        // })
      })
  },
  statusAdminGet: (req, res) => {
    Order
      .find({})
      .sort('creationDate')
      .populate('product')
      .then(orders => {
        if (!orders) {
          res.locals.globalError = 'Something went wrong. Please try again!'
          res.json({error: res.locals.globalError})
          // res.render('/')
          return
        }

        res.json({orders: orders})

        // res.render('orders/status', {
        //   orders: orders,
        //   helpers: {
        //     ifEquals: function (arg1, arg2, options) {
        //       return (arg1 === arg2) ? options.fn(this) : options.inverse(this)
        //     },
        //     select: function (selected, options) {
        //       return options.fn(this).replace(
        //         new RegExp(' value="' + selected + '"'),
        //         '$& selected="selected"')
        //     },
        //     formatDate: (date) => {
        //       let day = date.getDate()
        //       let month = date.getMonth() + 1
        //       let year = date.getFullYear()

        //       return day + '/' + month + '/' + year
        //     }
        //   }
        // })
      })
  },
  statusAdminPost: (req, res) => {
    let orders = req.body

    let orderIds = Object.keys(orders)
    let lastId = orderIds[orderIds.length - 1]
    orderIds.forEach((id) => {
      Order
        .findByIdAndUpdate(id, { status: orders[id] })
        .then(order => {
          if (order._id.equals(lastId)) {
            res.redirect('/order/status-admin')
          }
        })
        .catch(err => {
          res.json({error: err.message})
          // console.log(err.message)
        })
    })
  }
}
