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
    if (abs(e.deltaY) > abs(e.deltaX)) {
      const o = overflowY(node)
      if (o) {
        e.preventDefault()
        state.set((node.scrollTop + e.deltaY) / o)
      }
    }
  })
}

exports.listenScrollX = function listenScrollX (node, state, id) {
  node.addEventListener('wheel', e => {
    const aX = abs(e.deltaX)
    const aY = abs(e.deltaY)
    if (!aY || aY <= aX) {
      e.preventDefault()
    }
    if (aX > aY) {
      const o = overflowX(node)
      if (o) {
        e.preventDefault()
        state.set((node.scrollLeft + e.deltaX) / o)
      }
    }
  })
}
