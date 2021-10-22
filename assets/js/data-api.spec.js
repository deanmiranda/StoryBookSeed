const { dataVideoIcon, Carousel, CarouselControls } = require('./data-api')

function initCarousel(numSlides = 3) {
    const containerElem = document.createElement('article')
    containerElem.dataset.carousel = ''

    const innerContainerElem = document.createElement('div')
    innerContainerElem.dataset.carouselContainer = ''

    const controlsElem = document.createElement('nav')
    controlsElem.dataset.carouselControls = ''

    const nextElem = document.createElement('button')
    nextElem.dataset.carouselNext = ''

    const previousElem = document.createElement('button')
    previousElem.dataset.carouselPrevious = ''

    const slidesContainerElem = document.createElement('ul')
    slidesContainerElem.dataset.carouselSlides = ''

    const slideElems = new Array(numSlides)
        .fill('')
        .map(() => {
            const elem = document.createElement('li')
            elem.dataset.carouselSlide = ''
            return elem
        })

    controlsElem.append.apply(controlsElem, [nextElem, previousElem])

    containerElem.append.apply(containerElem, [
        controlsElem,
        innerContainerElem,
        slidesContainerElem,
        ...slideElems,
    ])

    const carouselMap = new WeakMap()
    const carouselInstance = new Carousel(containerElem, carouselMap)
    const carouselControlsInstance = new CarouselControls(controlsElem, carouselMap)

    return {
        carouselInstance,
        carouselControlsInstance,
        containerElem,
        nextElem,
        previousElem,
    }
}

describe('dataCarousel()', () => {
    it('Should clone the existing slide elements.', () => {
        const { containerElem } = initCarousel()

        expect(containerElem.querySelectorAll('[data-carousel-slide]').length).toBe(11)
    })

    it('Should proceed to the next slide when the appropriate button is clicked', async () => {
        const { carouselInstance, nextElem } = initCarousel()

        nextElem.click()

        expect(carouselInstance.currentSlide).toBe(2)
    })

    it('Should proceed to the previous slide when the appropriate button is clicked', async () => {
        const { carouselInstance, previousElem } = initCarousel()

        previousElem.click()

        expect(carouselInstance.currentSlide).toBe(3)
    })

    it('Should hide the carousel controls if only one slide is present', () => {
        const { carouselControlsInstance } = initCarousel(1)

        expect(carouselControlsInstance.$el.container.style.display).toBe('none')
    })
})

describe('dataVideoIcon()', () => {
    it('Should add a mouseover event listener to each video element.', () => {
        const querySpy = jest.spyOn(document, 'querySelectorAll')
        const mockElem = document.createElement('video')
        const eventSpy = jest.spyOn(mockElem, 'addEventListener')

        querySpy.mockReturnValue([mockElem])
        dataVideoIcon()

        expect(eventSpy).toHaveBeenCalled()
    })
})
