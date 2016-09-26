'use strict'
const shared = require('./shared')
const overflowX = shared.overflowX
const overflowY = shared.overflowY
const abs = Math.abs

exports.setScrollTop = function setScrollTop (target, state, node) {
  node.scrollTop = target.compute(state) * overflowY(node)
}

exports.setScrollLeft = function setScrollLeft (target, state, node) {
  node.scrollLeft = target.compute(state) * overflowX(node)
}

exports.setOverflowY =
exports.setOverflowX = function setOverflow (node) {
  node.style.overflow = 'hidden'
}

exports.listenScrollY = function listenScrollY (node, state, id) {
  node.addEventListener('wheel', e => {
    state.set((node.scrollTop + e.deltaY) / overflowY(node))
  })
}

exports.listenScrollX = function listenScrollX (node, state, id) {
  node.addEventListener('wheel', e => {
    if (abs(e.wheelDeltaX) > abs(e.wheelDeltaY)) {
      e.preventDefault()
      state.set((node.scrollLeft + e.deltaX) / overflowX(node))
    }
  })
}
