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
            setKey
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

function setKey (_setKey, key, val, stamp, resolve, nocontext) {
  if (key === '$') {
    this.cParent().define({
      extend: {
        render: {
          state (r, target, _state, type, stamp, subs, tree, id, pid, order) {
            if (type === 'new') { _state.get(val, 0) }
            return r(target, _state, type, stamp, subs, tree, id, pid, order)
          }
        }
      }
    }, false)
  }
  return _setKey.call(this, key, val, stamp, resolve, nocontext)
}
