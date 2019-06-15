var helmet = require('helmet')

function microHelmetHandler (req, res, opts) {
  var addHeaders = helmet(opts)
  return new Promise(function (resolve, reject) {
    addHeaders(req, res, function (err) {
      if (err) reject(err)
      else resolve()
    })
  })
}

function microHelmet (handler, opts) {
  var addHeaders = helmet(opts)

  return function (req, res) {
    return new Promise(function (resolve, reject) {
      addHeaders(req, res, function (err) {
        if (err) reject(err)
        else resolve()
      })
    }).then(function () {
      return handler(req, res)
    })
  }
}

module.exports = microHelmet
module.exports.addHeaders = microHelmetHandler
