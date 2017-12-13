const encryption = require('../utilities/encryption')
const User = require('mongoose').model('User')

module.exports = {
  registerGet: (req, res) => {
    res.render('users/register')
  },
  registerPost: (req, res) => {
    let reqUser = req.body
    // Add validations!

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    User
      .findOne({username: reqUser.username})
      .then(user => {
        if (user) {
          res.locals.globalError = 'Username already exists'
          res.json({error: res.locals.globalError})
          return
        }

        User.create({
          username: reqUser.username,
          firstName: reqUser.firstName,
          lastName: reqUser.lastName,
          salt: salt,
          hashedPass: hashedPassword
        }).then(user => {
          req.logIn(user, (err, user) => {
            if (err) {
              res.locals.globalError = err
              // res.render('users/register', user)
              res.json({error: res.locals.globalError})
            }

            res.redirect('/')
          })
        })
      })
  },
  loginGet: (req, res) => {
    res.render('users/login')
  },
  loginPost: (req, res) => {
    let reqUser = req.body
    User
      .findOne({ username: reqUser.username }).then(user => {
        if (!user) {
          res.locals.globalError = 'Invalid user data'
          // res.render('users/login')
          res.json({error: res.locals.globalError})
          return
        }

        if (!user.authenticate(reqUser.password)) {
          res.locals.globalError = 'Invalid user data'
          // res.render('users/login')
          res.json({error: res.locals.globalError})
          return
        }

        const userToReturn = {
          id: user._id,
          username: user.username,
          roles: user.roles
        }
        res.json({ user: userToReturn })

        req.logIn(user, (err, user) => {
          if (err) {
            res.locals.globalError = err
            // res.render('users/login')
            res.json({ error: res.locals.globalError })
          }

          // res.json({
          //   success: true
          // })

          res.redirect('/')
        })
      })
  },
  logout: (req, res) => {
    req.logout()
    res.redirect('/')
  }
}
