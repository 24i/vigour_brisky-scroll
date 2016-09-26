'use strict'
const sttc = require('./static')
const state = require('./state')

exports.inject = require('brisky-props')

exports.properties = {
  props: {
    types: {
      scroll: {
        listen: {
          type: 'observable',
          val: true
        },
        define: {
          extend: {
            set: scrollSet
          }
        }
      }
    },
    properties: {
      scrollTop: {
        type: 'scroll',
        render: {
          static: sttc.scrollTop,
          state: state.scrollTop
        }
      },
      scrollLeft: {
        type: 'scroll',
        render: {
          static: sttc.scrollLeft,
          state: state.scrollLeft
        }
      }
    }
  }
}

function scrollSet (set, val, stamp, nocontext) {
  this.cParent().define({
    extend: {
      render: {
        state: (r, target, state, type, stamp, subs, tree, id, pid, order) => {
          if (type === 'new' && this.$) { state.get(this.$.slice(), 0) }
          return r(target, state, type, stamp, subs, tree, id, pid, order)
        }
      }
    }
  }, false)
  return set.call(this, val, stamp, nocontext)
}
