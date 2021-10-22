import html from './cta-block.html'
import mdx from './cta-block.mdx'
import { domToStr, strToDom } from '../../assets/js/dom.js'
import { initDataApi } from '../../assets/js/data-api.js'

let htmlStr = html

const Template = (args) => {
    const dom = strToDom(htmlStr)
    const wrapperElem = dom.querySelector('[data-id="cta-block"]')
    const titleElem = dom.querySelector('[data-id="cta-block-title"]')
    const descriptionElem = dom.querySelector('[data-id="cta-block-description"]')
    const buttonElem = dom.querySelector('[data-id="cta-block-button"]')
    const imageElem = dom.querySelector('[data-id="cta-block-image"]')

    if (args.Reversed) {
        wrapperElem.classList.add('is-reversed')
    } else {
        wrapperElem.classList.remove('is-reversed')
    }

    titleElem.innerHTML = args.Title
    descriptionElem.innerText = args.Description
    buttonElem.innerText = args.Button
    imageElem.src = args.Image

    // we need to wait a bit for the DOM to re-render
    window.setTimeout(initDataApi, 1000)

    return (htmlStr = domToStr(dom))
}

export default {
    title: 'Components/CTA Block',

    argTypes: {
        Image: {
            options: [
                '/img/cta-change-the-world.jpg',
                '/img/cta-cultivating-giving.jpg',
            ],
            control: { type: 'select' },
        },

        Reversed: {
            control: { type: 'boolean' },
        },
    },

    decorators: [
        (story) => {
            require('./cta-block.scss')
            return story()
        },
    ],

    parameters: {
        docs: {
            page: mdx,
        },
    },
};

export const CTABlock = Template.bind({})

CTABlock.args = {
    Title: 'Sit Duis aliquip',
    Description: 'Example Description Text Duis ullamco ad reprehenderit laboris nisi laborum anim ullamco incididunt reprehenderit officia aute sunt reprehenderit.',
    Button: 'Amet anim',
    Image: '/img/cta-change-the-world.jpg',
    Reversed: false,
}
