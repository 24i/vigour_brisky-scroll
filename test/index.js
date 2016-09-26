'use strict'

if (typeof window !== 'undefined') {
  require('./style.css')
}

const animate = require('@vigour-io/blend-state-animate')
const render = require('brisky-core/render')
const Hub = require('brisky-hub')
const core = require('brisky-core')
const test = require('./fn')

core.prototype.inject(
  require('brisky-events/lib/basic'),
  require('brisky-props'),
  require('brisky-class'),
  require('brisky-style'),
  require('../lib')
)

const state = global.state = new Hub({
  url: 'ws://192.168.1.53:3031',
  context: 'youzi',
  items: {
    child: {
      focus: {
        sync: false
      }
    }
  },
  scroll: {
    $type: 'number',
    define: {
      extend: {
        set (_set, val, stamp, nocontext) {
          const items = this.parent.items
          const keys = items.keys()
          const l = keys.length
          const last = ~~(l * this.compute())
          const ret = _set.call(this, val, stamp, nocontext)
          const index = ~~(l * this.compute())

          items.set({
            [keys[last]]: { focus: false },
            [keys[index]]: { focus: true }
          })

          return ret
        }
      }
    }
  }
})

const buttons = {
  minus: {
    tag: 'button',
    text: '( - )',
    on: {
      click (e, stamp) {
        const scroll = (state.get('scroll', 0).compute() * 100 - 10) / 100
        animate(state.scroll, scroll, 36)
      }
    }
  },
  plus: {
    tag: 'button',
    text: '( + )',
    on: {
      click (e, stamp) {
        const scroll = (state.get('scroll', 0).compute() * 100 + 10) / 100
        animate(state.scroll, scroll, 36)
      }
    }
  }
}

const app = {
  buttons,
  proportion: {
    text: {
      $: 'scroll'
    }
  },
  scroller: {
    style: {
      border: '4px solid white',
      height: '60vh',
      width: 200
    },
    props: {
      scrollTop: {
        $: 'scroll'
      }
    },
    title: {
      text: {
        $: 'title'
      }
    },
    list: {
      $: 'items.$any',
      child: {
        style: {
          borderLeft: {
            $: 'focus',
            $transform: val => '8px solid ' + (val == 1 ? 'green' : 'white') // eslint-disable-line
          }
        },
        title: {
          text: {
            $: 'title'
          }
        }
      }
    }
  },
  scroller2: {
    style: {
      border: '10px solid grey',
      height: 200,
      width: 200
    },
    props: {
      scrollTop: {
        $: 'scroll'
      }
    },
    title: {
      text: {
        $: 'title'
      }
    },
    list: {
      $: 'items.$any',
      child: {
        style: {
          backgroundColor: {
            $: 'focus',
            $transform: val => val == 1 ? 'green' : 'white' // eslint-disable-line
          }
        },
        title: {
          text: {
            $: 'title'
          }
        }
      }
    }
  }
}

const node = render(app, state)

if (document.body) {
  document.body.appendChild(node)
}

test(node, state)
