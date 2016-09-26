'use strict'
const ua = require('vigour-ua/navigator')
module.exports = ua.device === 'desktop'
? require('./default')
: require('./touch')
