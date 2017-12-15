const Product = require('mongoose').model('Product')
const errorHandler = require('../utilities/error-handler')

module.exports = {
  createGet: (req, res) => {
    res.render('products/create')
  },
  createPost: (req, res) => {
    let productReq = req.body

    if (!productReq.toppings) {
      productReq.toppings = ''
    }

    Product
      .create({
        category: productReq.category,
        imageUrl: productReq.imageUrl,
        size: productReq.size,
        toppings: productReq.toppings.trim().split(', ')
      })
      .then(product => {
        res.redirect('/')
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        // res.render('products/create', productReq)
        res.json({error: res.locals.globalError})
      })
  },
  all: (req, res) => {
    Product
      .find({})
      .then(products => {
        let chickenDoners = products.filter(p => p.category === 'Chicken').sort('size')
        let beefDoners = products.filter(p => p.category === 'Beef').sort('size')
        let lambDoners = products.filter(p => p.category === 'Lamb').sort('size')

        let allProducts = {}
        if (chickenDoners.length > 0) { allProducts.chicken = chickenDoners }
        if (beefDoners.length > 0) { allProducts.beef = beefDoners }
        if (lambDoners.length > 0) { allProducts.lamb = lambDoners }

        // res.render('home/index', { allProducts })
        res.json({allProducts})
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        // res.render('home/index')
        res.json({error: res.locals.globalError})
      })
  },
  editGet: (req, res) => {
    let id = req.params.id

    Product
      .findById(id)
      .then(product => {
        if (!product) {
          res.locals.globalError = 'Product was not found.'
          res.render('home/index')
          return
        }

        product.toppings = product.toppings.join(', ')

        res.render('products/edit', { product: product })
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('home/index')
      })
  },
  editPost: (req, res) => {
    let productReq = req.body
    let productId = req.params.id

    if (!productReq.toppings) {
      productReq.toppings = ''
    }

    Product
      .findByIdAndUpdate(productId, {
        category: productReq.category,
        imageUrl: productReq.imageUrl,
        size: productReq.size,
        toppings: productReq.toppings.trim().split(', ')
      })
      .then(product => {
        res.redirect('/')
        // res.json(product)
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        // res.render('/', productReq)
        res.json({error: res.locals.globalError})
      })
  },
  deleteGet: (req, res) => {
    let id = req.params.id

    Product
      .findById(id)
      .then(product => {
        if (!product) {
          res.locals.globalError = 'Product was not found.'
          res.render('home/index')
          return
        }

        product.toppings = product.toppings.join(', ')

        res.render('products/delete', { product: product })
      })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.render('home/index')
      })
  },
  deletePost: (req, res) => {
    let id = req.params.id

    Product.findByIdAndRemove(id).then((removedProduct) => {
      if (!removedProduct) {
        // res.redirect(
        //   `/?error=${encodeURIComponent('error=Product was not found!')}`)
        res.locals.globalError = 'Product was not found!'
        res.json({error: res.locals.globalError})
        return
      }

      res.json(removedProduct)
    })
      .catch(err => {
        let message = errorHandler.handleMongooseError(err)
        res.locals.globalError = message
        res.json({error: res.locals.globalError})
        // res.render('home/index')
      })
  }
}
