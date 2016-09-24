'use strict'
require('./style.css')

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
  context: 'youzi'
})

const buttons = {
  minus: {
    tag: 'button',
    text: '( - )',
    on: {
      click (e, stamp) {
        const scroll = (state.get('scroll', 0).compute() * 100 - 1) / 100
        state.set({ scroll }, stamp)
      }
    }
  },
  plus: {
    tag: 'button',
    text: '( + )',
    on: {
      click (e, stamp) {
        const scroll = (state.get('scroll', 0).compute() * 100 + 1) / 100
        state.set({ scroll }, stamp)
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

let last = 0
const data = {
  title: 'Fun list!',
  scroll: {
    $type: 'number',
    define: {
      extend: {
        set (_set, val, stamp, nocontext) {
          const keys = state.items.keys()
          const l = keys.length
          const last = ~~(l * this.compute())
          const ret = _set.call(this, val, stamp, nocontext)
          const index = ~~(l * this.compute())

          state.items.set({
            [keys[last]]: { focus: 0 },
            [keys[index]]: { focus: 1 }
          })

          return ret
        }
      }
    }
  },
  items: []
}

let count = 0
while (++count <= 50) {
  data.items.push({
    title: `${count}. item`,
    focus: {
      sync: false
    }
  })
}

state.set(data, false)
const node = render(app, state)

document.body.appendChild(node)

test(node, state)
