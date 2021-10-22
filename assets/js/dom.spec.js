const {
    domToStr,
    onDocumentComplete,
    onDocumentInteractive,
    onResize,
    strToDom,
} = require('./dom')

describe('domToStr()', () => {
    it('Should convert a document fragment into a string.', () => {
        const dom = document.createElement('div')
        const domStr = domToStr(dom)

        expect(typeof domStr).toBe('string')
        expect(domStr).toBe('<div></div>')
    })
})

describe('onDocumentInteractive()', () => {
    it('Should executive the specified function when the document is interactive.', () => {
        const spy = jest.fn()

        onDocumentInteractive(spy)

        expect(spy).toHaveBeenCalled()
    })
})

describe('onDocumentComplete()', () => {
    it('Should executive the specified function when the document loading is complete.', async () => {
        const spy = jest.fn()

        onDocumentComplete(spy)
        await new Promise((resolve) => setTimeout(resolve, 100))

        expect(spy).toHaveBeenCalled()
    })
})

describe('onResize()', () => {
    it('Should executive the specified function whenever the window is resized.', async () => {
        const spy = jest.fn()

        onResize(spy)
        global.innerWidth = 1000;
        global.dispatchEvent(new Event('resize'))
        await new Promise((resolve) => setTimeout(resolve, 250))

        expect(spy).toHaveBeenCalled()
    })
})

describe('strToDom()', () => {
    it('Should convert a string into a document fragment.', () => {
        const domStr = '<div></div>'
        const dom = strToDom(domStr)

        expect(typeof dom.querySelector).toBe('function')
        expect(dom.querySelectorAll('div').length).toBe(1)
    })
})
