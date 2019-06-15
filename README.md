# micro-helmet

security headers for micro

[Install](#install) - [Usage](#usage) - [License: Apache-2.0](#license)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/micro-helmet.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/micro-helmet
[travis-image]: https://img.shields.io/travis/com/goto-bus-stop/micro-helmet.svg?style=flat-square
[travis-url]: https://travis-ci.com/goto-bus-stop/micro-helmet
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install micro-helmet
```

## Usage

As a wrapper function:

```js
var helmet = require('micro-helmet')

module.exports = helmet(async (req, res) => {
  return { ok: true }
})
```

As a utility:

```js
var helmet = require('micro-helmet')

module.exports = async (req, res) => {
  await helmet.addHeaders(req, res)
  return { ok: true }
}
```

## API

### `helmet(handler, opts={})`

Wrap a handler function. This adds helmet's headers before calling your handler.
`opts` can be used to configure specific headers. It is passed through to [helmet](https://github.com/helmetjs/helmet#how-it-works).

### `helmet.addHeaders(req, res, opts={})`

Add helmet's headers.
`opts` can be used to configure specific headers. It is passed through to [helmet](https://github.com/helmetjs/helmet#how-it-works).

## License

[Apache-2.0](LICENSE.md)
