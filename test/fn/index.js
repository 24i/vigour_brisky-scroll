'use strict'
const render = require('brisky-core/render')
const s = require('vigour-state/s')
const test = require('tape')

module.exports = function (node, state) {
  test('brisky-scroll', { timeout: 10e3 }, function (t) {
    const elem = {
      props: {
        scrollTop: {
          $: 'testScrollTop'
        }
      }
    }
    s({})
    render(elem, state)

    t.equals(state.testScrollTop && state.testScrollTop.compute(), 0, 'should add subscribed field to state')
    t.end()
  })
}
