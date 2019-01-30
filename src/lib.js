// Entry file for the library build
// import and export every component form /components
let context = require.context('./components', false, /.*\.vue$/)
let components = {}
context.keys().forEach(key => {
  // Strip the leading `./` and extension from the key
  let componentName = key.replace(/^\.\/(.*)\.\w+$/, '$1')
  // Get component config
  let component = context(key)

  components[componentName] = component.default || component
})

// Require styles so they are extracted in lib.css
require('./styles/main.less')
require('./styles/grid.less')

export default components
