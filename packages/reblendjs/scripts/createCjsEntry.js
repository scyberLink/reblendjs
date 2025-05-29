import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '../lib/index.cjs.js');

const content = `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/reblendjs.cjs.min.js');
} else {
  module.exports = require('./cjs/reblendjs.cjs.js');
}
`;

writeFileSync(outPath, content);