import * as fs from 'fs'
import { webpackBlueprint } from './blueprints/webpack.blueprint.js'

// before running webpack, we create a temporary entry file that links to all of the component JS files
// ... otherwise webpack would not know which files need processing
// ... afterwards we delete this temporary entry file in the post-build.js script
fs.writeFileSync('index.js', webpackBlueprint())

// clean up any existing /dist files
fs.rmdirSync('dist', { recursive: true })
