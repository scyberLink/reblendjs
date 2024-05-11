#!/bin/bash

npx webpack --config ./webpack.config.js
cp -R public/* build
cp -f index.html build