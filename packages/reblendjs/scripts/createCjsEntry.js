const fs = require('fs')
const path = require('path')

const outPath = path.join(__dirname, '../lib/index.cjs.js')

const content = `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reblendjs.cjs.min.js');
} else {
  module.exports = require('./cjs/reblendjs.cjs.js');
}
`

fs.writeFileSync(outPath, content)
