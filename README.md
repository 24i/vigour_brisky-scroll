# brisky-scroll
Scroll property that stores and applies scroll using state

### usage
```js
// elem
{
  props: {
    scrollTop: {
      $: 'funkyScrollField'
    }
  }
}
```
will do internally
```js
// elem
{
  props: {
    scrollTop: {
      $: 'funkyScrollField',
      render: {
        state () {
          const t = target // find the node
          t.scrollTop = val * (t.scrollWidth - t.offsetWidth)
        }
      }
    }
  },
  on: {
    scroll: {
      briskyScroll (e, stamp) { // update the state on scroll using proportion
        const t = e.target
        e.state.get('funkyScrollField', 0).set({
          scroll: t.scrollTop / (t.scrollWidth - t.offsetWidth)
        }, stamp)
      }
    }
  }
}
```
