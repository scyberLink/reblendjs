#!/bin/bash

npx webpack --config ./webpack.config.prod.js
cp -R public/* build
cp -f index.html build