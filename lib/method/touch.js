'use strict'
const vstamp = require('vigour-stamp')
const shared = require('./shared')
const overflowX = shared.overflowX
const overflowY = shared.overflowY

exports.setScrollTop = function setScrollTop (target, state, node) {
  node.scrollBlock = true
  node.scrollTop = target.compute(state) * overflowY(node)
}

exports.setScrollLeft = function setScrollLeft (target, state, node) {
  node.scrollBlock = true
  node.scrollLeft = target.compute(state) * overflowX(node)
}

exports.setOverflowY = function setOverflowY (node) {
  node.style.overflowY = 'scroll'
  node.style.overflowX = 'hidden'
}

exports.setOverflowX = function setOverflowX (node) {
  node.style.overflowX = 'scroll'
  node.style.overflowY = 'hidden'
}

exports.listenScrollY = function listenScrollY (node, state, id) {
  node.addEventListener('scroll', e => {
    if (node.scrollBlock) {
      node.scrollBlock = null
    } else {
      const val = node.scrollTop / overflowY(node)
      const stamp = vstamp.create(`scroll-${id}`)
      state.set(val, stamp)
      vstamp.close(stamp)
    }
  })
}

exports.listenScrollX = function listenScrollX (node, state, id) {
  node.addEventListener('scroll', e => {
    if (node.scrollBlock) {
      node.scrollBlock = null
    } else {
      const val = node.scrollLeft / overflowX(node)
      const stamp = vstamp.create(`scroll-${id}`)
      state.set(val, stamp)
      vstamp.close(stamp)
    }
  })
}
