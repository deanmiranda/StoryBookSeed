export function webpackBlueprint() {
    return `const { onDocumentInteractive } = require('./assets/js/dom.js')
const { initDataApi } = require('./assets/js/data-api.js')
require('./assets/js/navigation.js')
require('./assets/js/data-api.js')
function requireAll(r) { r.keys().forEach(r) }
requireAll(require.context('./components', true, /[^stories]\\.js$/))
requireAll(require.context('./static/img', true, /\\.(jpe?g|png|gif|svg|webp)$/));  
requireAll(require.context('./static/mp4', true))

onDocumentInteractive(initDataApi)
`
}