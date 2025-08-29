'use strict';

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const distFile = path.join(projectRoot, 'dist', 'competitive-intelligence-app.js');
const staticTarget = path.resolve(projectRoot, '..', 'static', 'js', 'competitive-intelligence-app.js');

if (!fs.existsSync(distFile)) {
  console.error('Build artifact not found:', distFile);
  process.exit(1);
}

fs.mkdirSync(path.dirname(staticTarget), { recursive: true });
fs.copyFileSync(distFile, staticTarget);
console.log('Copied bundle to', staticTarget);


