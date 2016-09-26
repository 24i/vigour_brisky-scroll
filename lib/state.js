'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const raf = global.requestAnimationFrame || process.nextTick
const v = require('vigour-stamp')
const m = require('./method')
const setOverflowX = m.setOverflowX
const setOverflowY = m.setOverflowY
const setScrollTop = m.setScrollTop
const setScrollLeft = m.setScrollLeft
const listenScrollX = m.listenScrollX
const listenScrollY = m.listenScrollY

exports.scrollTop =
function scrollTopState (target, state, type, stamp, subs, tree, id, pid) {
  if (type === 'update') {
    if (v.type(stamp) !== `scroll-${id}` || v.src(stamp) !== state.root.id) {
      setScrollTop(target, state, getParent(type, stamp, subs, tree, pid))
    }
  } else if (type === 'new') {
    const node = getParent(type, stamp, subs, tree, pid)
    setOverflowY(node)
    raf(() => setScrollTop(target, state, node))
    if (target.listen.compute()) { listenScrollY(node, state, id) }
  }
}

exports.scrollLeft =
function scrollLeftState (target, state, type, stamp, subs, tree, id, pid) {
  if (type === 'update') {
    if (v.type(stamp) !== `scroll-${id}` || v.src(stamp) !== state.root.id) {
      setScrollLeft(target, state, getParent(type, stamp, subs, tree, pid))
    }
  } else if (type === 'new') {
    const node = getParent(type, stamp, subs, tree, pid)
    setOverflowX(node)
    raf(() => setScrollLeft(target, state, node))
    if (target.listen.compute()) { listenScrollX(node, state, id) }
  }
}
