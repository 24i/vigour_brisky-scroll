'use strict'
const Hub = require('brisky-hub')
const state = global.hub = new Hub({ port: 3031 })

const data = {
  title: 'Fun list!',
  items: []
}

let count = 0
while (++count <= 50) {
  data.items.push({
    title: `${count}. title`,
    subtitle: `${count}. subtitle`,
    description: `${count}. description sdkljhfkjds flhksdjhflsd klfsdkjhf sdkjhfdslkjhf ls ldfk ldslfjdh`,
    img: {
      thumb: 'https://www.royalcanin.com/~/media/Royal-Canin/Product-Categories/cat-breed-landing-hero.ashx'
    }
  })
}

state.set(data, false)
