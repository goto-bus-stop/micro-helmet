var tape = require('tape')
var fetch = require('node-fetch')
var micro = require('micro')
var helmet = require('.')

tape('adds security headers', function (t) {
  t.plan(3)

  var server = micro(helmet(function () {
    return { ok: true }
  }))
  t.on('end', server.close.bind(server))
  server.listen(function () {
    var url = 'http://0.0.0.0:' + server.address().port

    fetch(url).then(function (res) {
      t.strictEqual(res.headers.get('X-DNS-Prefetch-Control'), 'off')
      t.strictEqual(res.headers.get('X-Frame-Options'), 'SAMEORIGIN')
      t.strictEqual(res.headers.get('X-Download-Options'), 'noopen')
    })
  })
})

tape('supports options', function (t) {
  t.plan(1)

  var server = micro(helmet(function () {
    return { ok: true }
  }, {
    frameguard: { action: 'deny' }
  }))
  t.on('end', server.close.bind(server))
  server.listen(function () {
    var url = 'http://0.0.0.0:' + server.address().port

    fetch(url).then(function (res) {
      t.strictEqual(res.headers.get('X-Frame-Options'), 'DENY')
    })
  })
})

tape('use as utility', function (t) {
  t.plan(3)

  var server = micro(function (req, res) {
    return helmet.addHeaders(req, res, {
      frameguard: { action: 'deny' }
    }).then(function () {
      return { ok: true }
    })
  })
  t.on('end', server.close.bind(server))
  server.listen(function () {
    var url = 'http://0.0.0.0:' + server.address().port

    fetch(url).then(function (res) {
      t.strictEqual(res.headers.get('X-DNS-Prefetch-Control'), 'off')
      t.strictEqual(res.headers.get('X-Frame-Options'), 'DENY')
      t.strictEqual(res.headers.get('X-Download-Options'), 'noopen')
    })
  })
})
