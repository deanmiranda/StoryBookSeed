import * as fs from 'fs'

fs.rmSync('index.js')

// ! temp hack
// Webpack generates an empty JS files for CSS-only entry points
// ... this is a workaround until that gets fixed. For more info see:
// https://github.com/webpack/webpack/issues/11671
const tempFiles = ['dist/global.js', 'dist/component.js']

tempFiles.forEach((path) => {
    if (fs.existsSync(path)) {
        fs.rmSync(path)
    }
})

// ! temp hack #2
// TODO
