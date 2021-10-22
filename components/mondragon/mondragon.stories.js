import html from './mondragon.html'
import mdx from './mondragon.mdx'
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
    title: 'Components/Mondragon',
    argTypes: {},

    decorators: [
        (story) => {
            require('./mondragon.scss')
            return story()
        },
    ],

    parameters: {
        docs: {
            page: mdx,
        },
    },
};

export const Mondragon = Template.bind({})

Mondragon.args = {}
