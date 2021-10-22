import { domToStr, strToDom } from '../assets/js/dom.js'
import { initDataApi } from '../assets/js/data-api.js'


// STEP 1 - import the markup for each component:
import ctaBlockHtml from '../components/cta-block/cta-block.html'

// STEP 2 - concatenate the markup for each component into a single HTML string:
let htmlStr = [
    ctaBlockHtml,
].join('')

const Template = () => {
    const dom = strToDom(htmlStr)

    // we need to wait a bit for the DOM to re-render
    window.setTimeout(initDataApi, 1000)
    return (htmlStr = domToStr(dom))
}

export default {
    title: 'Pages/Homepage',
    argTypes: {},

    decorators: [
        (story) => {
            // STEP 3 - load the Sass file for each component you imported:
            require('../components/cta-block/cta-block.scss')
            return story()
        },
    ],
};

export const Homepage = Template.bind({})

Homepage.args = {}
