const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))
const connectionString = 'mongodb://admin:admin@ds141796.mlab.com:41796/doner-place-angular'
// 'mongodb://localhost:27017/doner-place-angular'

module.exports = {
  development: {
    rootPath: rootPath,
    db: connectionString,
    port: 1337
  },
  staging: {
  },
  production: {
    port: process.env.PORT
  }
}
