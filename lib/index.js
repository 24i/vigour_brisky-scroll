'use strict'
const getParent = require('brisky-core/lib/render/dom/parent')
const vstamp = require('vigour-stamp')
const raf = global.requestAnimationFrame
const handle = require('./handle')
const handleScrollTop = handle.scrollTop
const handleScrollLeft = handle.scrollLeft

exports.inject = require('brisky-props')

exports.properties = {
  props: {
    properties: {
      scrollTop: {
        render: {
          static (target, pnode) {
            pnode.scrollTop = target.compute()
          },
          state: function _state (target, state, type, stamp, subs, tree, id, pid) {
            if (type === 'update') {
              if (vstamp.type(stamp) !== `scroll-${id}` || vstamp.src(stamp) !== state.root.id) {
                const pnode = getParent(type, stamp, subs, tree, pid)
                pnode.scrollBlock = true
                pnode.scrollTop = target.compute(state) * (pnode.scrollHeight - pnode.clientHeight)
              }
            } else if (type === 'new') {
              raf(() => _state(target, state, 'update', stamp, subs, tree, id, pid))
              handleScrollTop(getParent(type, stamp, subs, tree, pid), state, id)
            }
          }
        }
      },
      scrollLeft: {
        render: {
          static (target, pnode) {
            pnode.scrollLeft = target.compute()
          },
          state: function _state (target, state, type, stamp, subs, tree, id, pid) {
            if (type === 'update') {
              if (vstamp.type(stamp) !== `scroll-${id}` || vstamp.src(stamp) !== state.root.id) {
                const pnode = getParent(type, stamp, subs, tree, pid)
                pnode.scrollBlock = true
                pnode.scrollLeft = target.compute(state) * (pnode.scrollWidth - pnode.clientWidth)
              }
            } else if (type === 'new') {
              raf(() => _state(target, state, 'update', stamp, subs, tree, id, pid))
              handleScrollLeft(getParent(type, stamp, subs, tree, pid), state, id)
            }
          }
        }
      }
    }
  }
}
