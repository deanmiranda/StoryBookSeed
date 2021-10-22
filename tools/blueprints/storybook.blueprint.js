import { capitalCase, paramCase } from 'change-case'

export function storybookBlueprint(componentName) {
    const displayName = componentName.split(' ')
        .map((word) => {
            const isAllCaps = word.split('').every((letter) => !!letter.match(/[A-Z]/))

            if (isAllCaps) {
                return word
            }

            return capitalCase(word)
        })
        .join(' ')

    return `import html from './${ paramCase(componentName) }.html'
import mdx from './${ paramCase(componentName) }.mdx'
import { domToStr, strToDom } from '../../assets/js/dom.js'
import { initDataApi } from '../../assets/js/data-api.js'

let htmlStr = html

const Template = (args) => {
    const dom = strToDom(htmlStr)
    
    // add your controls here
    console.log('[ARGS]', args)

    // we need to wait a bit for the DOM to re-render
    window.setTimeout(initDataApi, 1000)

    return (htmlStr = domToStr(dom))
}

export default {
    title: 'Components/${ displayName }',
    argTypes: {},

    decorators: [
        (story) => {
            require('./${ paramCase(componentName) }.scss')
            return story()
        },
    ],

    parameters: {
        docs: {
            page: mdx,
        },
    },
};

export const ${ displayName.replace(/ /g, '') } = Template.bind({})

${ displayName.replace(/ /g, '') }.args = {}
`
}