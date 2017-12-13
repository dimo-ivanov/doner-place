module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      // res.json({error: 'You are not authenticated for this request'})
      next()
    }
  },
  isInRole: (role) => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
        next()
      } else {
        // res.json({error: 'You are not authenticated for this request'})
        next()
      }
    }
  }
}
