/*
    domToStr
        - Converts a DOM object into an HTML string.

    [EXAMPLE]
        const heading = document.createElement('h1')
        heading.innerText = 'hello world'

        domToStr(heading) // "<h1>hello world</h1>""
*/
function domToStr(domObj) {
    const tempContainer = document.createElement('div')
    tempContainer.appendChild(domObj)
    return tempContainer.innerHTML
}

/*
    onDocumentComplete
        - Executes the specified callback function when the document and all sub-resources have finished loading. You can optionally pass a number as the second argument, which will delay the passed-in function from being executed for X milliseconds.

    [EXAMPLE]
        onDocumentComplete(doSomething) // no delay
        onDocumentComplete(doSomething, 2000) // 2 second delay
*/
function onDocumentComplete(fn, delay = 0) {
    window.setTimeout(() => {
        if (document.readyState === 'complete') {
            fn()
        } else {
            window.addEventListener('load', fn)
        }
    }, delay)
}

/*
    onDocumentInteractive
        - Executes the specified callback function when the document has finished loading and been parsed, but sub-resources such as scripts, images, stylesheets and frames are still loading.

    [EXAMPLE]
        onDocumentInteractive(doSomething)
*/
function onDocumentInteractive(fn) {
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn()
    } else {
        window.addEventListener('DOMContentLoaded', fn)
    }
}

/*
    onResize
        - Executes the specified callback function whenever the window is resized.
        - The functions has built-in debouncing (250ms) for performance reasons.

    [EXAMPLE]
        onResize(() => console.log('window resized'))
*/
function onResize(fn) {
    resizeCtx.init()
    resizeCtx.queue.push(fn)
}

const resizeCtx = {
    init() {
        if (resizeCtx.isInitialized) return

        window.addEventListener('resize', () => {
            window.clearTimeout(resizeCtx.timeout)

            resizeCtx.timeout = window.setTimeout(() => {
                for (const fn of resizeCtx.queue) {
                    fn()
                }
            }, 250)
        })

        resizeCtx.isInitialized = true
    },

    isInitialized: false,
    timeout: 0,
    queue: [],
}

/*
    strToDom
        - Converts an HTML string into a DOM object.

    [EXAMPLE]
        strToDom('<h1>hello world</h1>')
*/
function strToDom(htmlStr) {
    return document.createRange().createContextualFragment(htmlStr)
}

module.exports = {
    domToStr,
    onDocumentComplete,
    onDocumentInteractive,
    onResize,
    strToDom,
}
