#!/usr/bin/env bash
sed -i -n '1,/# API/p' README.md && ./node_modules/.bin/jsdoc2md --files 'src/**/*.ts' --configure jsdoc2md.json >> README.md
