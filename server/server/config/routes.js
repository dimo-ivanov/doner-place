const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.products.all)
  // app.get('/admin', auth.isInRole('Admin'), controllers.products.all-admin)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/products/create', auth.isInRole('Admin'), controllers.products.createGet)
  app.post('/products/create', auth.isInRole('Admin'), controllers.products.createPost)
  app.get('/products/edit/:id', auth.isInRole('Admin'), controllers.products.editGet)
  app.post('/products/edit/:id', auth.isInRole('Admin'), controllers.products.editPost)
  app.get('/products/delete/:id', auth.isInRole('Admin'), controllers.products.deleteGet)
  app.post('/products/delete/:id', auth.isInRole('Admin'), controllers.products.deletePost)

  app.get('/order/customize/:id', auth.isAuthenticated, controllers.orders.addGet)
  app.post('/order/add', auth.isAuthenticated, controllers.orders.addPost)
  app.get('/order/details/:id', auth.isAuthenticated, controllers.orders.detailsGet)
  app.get('/order/status', auth.isAuthenticated, controllers.orders.statusGet)
  app.get('/order/status-admin', auth.isInRole('Admin'), controllers.orders.statusAdminGet)
  app.post('/order/status-admin', auth.isInRole('Admin'), controllers.orders.statusAdminPost)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
