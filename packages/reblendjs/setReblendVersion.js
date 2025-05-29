const packageJson = require('./package.json');
const fs = require('fs');

const currentVersion = packageJson.version;
const reblendClassFilePath = require.resolve('./lib/internal/Reblend');
const reblendClassBuffer = fs.readFileSync(reblendClassFilePath);
const reblendClassContent = reblendClassBuffer.toString();
const reblendClassLines = reblendClassContent.split('\n');

const updatedClassLines = reblendClassLines.map((line) =>
    line.includes('version') ? `  static version = "${currentVersion}"` : line,
);

const updatedClassContent = updatedClassLines.join('\n');

fs.writeFileSync(reblendClassFilePath, updatedClassContent);
