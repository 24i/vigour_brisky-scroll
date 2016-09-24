'use strict'
const ua = require('vigour-ua/navigator')
const vstamp = require('vigour-stamp')

if (ua.device === 'desktop') {
  exports.scrollTop = function handleScrollTop (pnode, state, id) {
    pnode.style.overflow = 'hidden'
    pnode.addEventListener('wheel', e => {
      e.preventDefault()
      state.set((pnode.scrollTop + e.deltaY) / (pnode.scrollHeight - pnode.clientHeight))
    })
  }
  exports.scrollLeft = function handleScrollLeft (pnode, state, id) {
    pnode.style.overflow = 'hidden'
    pnode.addEventListener('wheel', e => {
      e.preventDefault()
      state.set((pnode.scrollLeft + e.deltaX) / (pnode.scrollWidth - pnode.clientWidth))
    })
  }
} else {
  exports.scrollTop = function handleScrollTop (pnode, state, id) {
    pnode.style.overflow = 'scroll'
    pnode.addEventListener('scroll', e => {
      if (pnode.scrollBlock) {
        pnode.scrollBlock = null
      } else {
        const val = pnode.scrollTop / (pnode.scrollHeight - pnode.clientHeight)
        const stamp = vstamp.create(`scroll-${id}`)
        state.set(val, stamp)
        vstamp.close(stamp)
      }
    })
  }
  exports.scrollLeft = function handleScrollLeft (pnode, state, id) {
    pnode.style.overflow = 'scroll'
    pnode.addEventListener('scroll', e => {
      if (pnode.scrollBlock) {
        pnode.scrollBlock = null
      } else {
        const val = pnode.scrollLeft / (pnode.scrollWidth - pnode.clientWidth)
        const stamp = vstamp.create(`scroll-${id}`)
        state.set(val, stamp)
        vstamp.close(stamp)
      }
    })
  }
}
