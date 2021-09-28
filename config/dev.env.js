'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://39.101.202.100:8100"'
  // BASE_API: '"http://admin-api.macrozheng.com"'
})
