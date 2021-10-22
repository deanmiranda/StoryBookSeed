const { onResize } = require('./dom')

/*
    dataCarousel
        - Initializes one or more Carousels, using a data attribute based API.
        - Carousel options can be specified using data attributes as well, check out the [OPTIONS] section below.
        - The controls will automatically work as long as you are using the correct markup (e.g. correct data attributes). Check out the [EXAMPLES] section below.
        - There are a few core styles that need to be present for the carousel to work, check out assets/scss/_carousel.scss.

    [OPTIONS]
        1. Padding
            - Enabling this option will add padding to the left and right side of the carousel slides.
            - Within this padding, portions of the previous and next slide will be displayed.
            - Example usage:
                <div data-carousel data-carousel-padding> ... </div>

        2. Fade
            - Enabling this option will cause the carousel to slide the slides in from the left/right sides of the screen.
            - This will override the default behavior, which is for slides to fade in and out (by toggling the opacity).
            - Example usage:
                <div data-carousel data-carousel-fade> ... </div>

    [EXAMPLES]
        <!-- SINGLE CAROUSEL -->
        <!-- Options: Padding -->

        <article data-carousel data-carousel-padding>
            <div data-carousel-container>
                <ul data-carousel-slides>
                    <li data-carousel-slide>SLIDE 1</li>
                    <li data-carousel-slide>SLIDE 2</li>
                    <li data-carousel-slide>SLIDE 3</li>
                </ul>
            </div>

            <nav data-carousel-controls>
                <button data-carousel-previous>
                    PREV
                </button>

                <span data-carousel-current>1</span> of <span data-carousel-count>3</span>

                <button data-carousel-next>
                    NEXT
                </button>
            </nav>
        </article>

        <!-- MULTIPLE CAROUSELS -->
        <!-- Options: Fade Transition (on the first carousel) -->

        <article data-carousel-group>
            <section data-carousel data-carousel-fade>
                <div data-carousel-container>
                    <ul data-carousel-slides>
                        <li data-carousel-slide>SLIDE 1</li>
                        <li data-carousel-slide>SLIDE 2</li>
                        <li data-carousel-slide>SLIDE 3</li>
                    </ul>
                </div>

                <nav data-carousel-controls>
                    <button data-carousel-previous>
                        PREV
                    </button>

                    <span data-carousel-current>1</span> of <span data-carousel-count>3</span>

                    <button data-carousel-next>
                        NEXT
                    </button>
                </nav>
            </section>

            <sectiondata-carousel>
                <div data-carousel-container>
                    <ul data-carousel-slides>
                        <li data-carousel-slide>SLIDE 1</li>
                        <li data-carousel-slide>SLIDE 2</li>
                        <li data-carousel-slide>SLIDE 3</li>
                    </ul>
                </div>
            </section>
        </article>

        /// JS
        dataCarousel()
*/
function dataCarousel() {
    // this maps DOM elements to their Carousel class instances
    // ... it's needed by the CarouselControls class, so it can trigger the next() and previous() methods
    const carouselMap = new WeakMap()

    document.querySelectorAll('[data-carousel]').forEach((elem) => {
        new Carousel(elem, carouselMap)
    })

    document.querySelectorAll('[data-carousel-controls]').forEach((elem) => {
        new CarouselControls(elem, carouselMap)
    })
}

class CarouselControls {
    static MIN_SWIPE_DISTANCE = 50 // in pixels
    static SWIPE_LEFT = 'left'
    static SWIPE_RIGHT = 'right'

    constructor(containerElem, carouselMap) {
        this.$el = {
            carousels: containerElem.closest('[data-carousel-group]')
                ? [...containerElem.closest('[data-carousel-group]').querySelectorAll('[data-carousel]')]
                : [containerElem.closest('[data-carousel]')],

            carouselContainer: containerElem.closest('[data-carousel-group]')
                ? containerElem.closest('[data-carousel-group]')
                : containerElem.closest('[data-carousel]'),

            container: containerElem,
            next: containerElem.querySelector('[data-carousel-next]'),
            previous: containerElem.querySelector('[data-carousel-previous]'),
        }

        this.carouselMap = carouselMap
        this.onNext = this.onNext.bind(this)
        this.onPrevious = this.onPrevious.bind(this)
        this.onTouchStart = this.onTouchStart.bind(this)
        this.onTouchEnd = this.onTouchEnd.bind(this)
        this.touchCoordStart = 0

        const carouselInstance = this.carouselMap.get(this.$el.carousels[0])
        const hasMoreThanOneSlide = carouselInstance.numSlides > 1

        const hasRequiredElems = this.$el.previous
            && this.$el.next
            && this.$el.carousels.length

        if (!hasMoreThanOneSlide) {
            this.hide()
        } else if (hasRequiredElems) {
            this.addEventListeners()
        } else {
            console.warn('[CAROUSEL CONTROLS] Failed to initialize. One or more of the required DOM elements could not be found.')
        }
    }

    addEventListeners() {
        this.$el.next.addEventListener('click', this.onNext)
        this.$el.previous.addEventListener('click', this.onPrevious)
        this.$el.carouselContainer.addEventListener('touchstart', this.onTouchStart)
        this.$el.carouselContainer.addEventListener('touchend', this.onTouchEnd)
    }

    forEachCarousel(fn) {
        this.$el.carousels.forEach((elem) => {
            const carouselInstance = this.carouselMap.get(elem)

            if (carouselInstance) {
                fn(carouselInstance)
            }
        })
    }

    hide() {
        this.$el.container.style.display = 'none'
    }

    onNext() {
        this.forEachCarousel((carousel) => carousel.next())
    }

    onPrevious() {
        this.forEachCarousel((carousel) => carousel.previous())
    }

    onTouchStart(e) {
        this.touchCoordStart = e.changedTouches[0].clientX
    }

    onTouchEnd(e) {
        const touchCoordEnd = e.changedTouches[0].clientX
        const swipeDistance = Math.abs(this.touchCoordStart - touchCoordEnd)
        const hasSwiped = swipeDistance >= CarouselControls.MIN_SWIPE_DISTANCE
        const swipeDirection = this.touchCoordStart < touchCoordEnd
            ? CarouselControls.SWIPE_RIGHT
            : CarouselControls.SWIPE_LEFT
        
        if (hasSwiped) {
            this.onSwipe(swipeDirection)
        }
    }

    onSwipe(direction) {
        if (direction === CarouselControls.SWIPE_LEFT) {
            this.forEachCarousel((carousel) => carousel.next())
        }

        if (direction === CarouselControls.SWIPE_RIGHT) {
            this.forEachCarousel((carousel) => carousel.previous())
        }
    }
}

class Carousel {
    static CURRENT_SLIDE_CLASS = 'is-current'
    static FADE_TRANSITION = 'fade'
    static FADE_TRANSITION_CLASS = 'has-fade-transition'
    static SLIDE_TRANSITION = 'slide'

    constructor(containerElem, carouselMap) {
        // n.b. these are all populated inside of setCarouselData
        this.currentSlide = 0
        this.isResetting = false
        this.numSlides = 0
        this.transitionDuration = 0
        this.transitionStyle = ''
        this.xCoordDefault = 0
        this.xCoord = 0

        this.$el = {
            container: containerElem,
            count: containerElem.querySelector('[data-carousel-count]'),
            current: containerElem.querySelector('[data-carousel-current]'),
            innerContainer: containerElem.querySelector('[data-carousel-container]'),
            slides: [...containerElem.querySelectorAll('[data-carousel-slide]')],
            slidesContainer: containerElem.querySelector('[data-carousel-slides]'),
            fullCarousel: containerElem.closest('[data-carousel-full]'),
        }

        carouselMap.set(this.$el.container, this)

        const hasRequiredElems = this.$el.slides.length
            && this.$el.slidesContainer
            && this.$el.innerContainer
            
        if (hasRequiredElems) {
            this.setCarouselData()
            this.updateCount()
            this.updateCurrent()
            this.cloneSlides()
            this.setStyles()
            this.setTransitionStyles()

            onResize(() => {
                this.setCarouselData()
                this.setStyles()
                this.setTransitionStyles()
            })
        } else {
            console.warn('[CAROUSEL] Failed to initialize. One or more of the required DOM elements could not be found.')
        }
    }

    cloneSlides() {
        // the "fade" transition style simply toggles the opacity of each slide
        // ... which means we don't need to clone elements, which only applies to the "slide" transition
        // ... where portions of the next/previous slides are displayed on the sides of the screen
        if (this.transitionStyle === Carousel.FADE_TRANSITION) return

        const cloneSetA = this.$el.slides.map((slideElem) => slideElem.cloneNode(true))
        const cloneSetB = this.$el.slides.map((slideElem) => slideElem.cloneNode(true))

        const firstSlideClone = this.$el.slides[0].cloneNode(true)
        const lastSlideClone = this.$el.slides[this.$el.slides.length - 1].cloneNode(true)
        
        this.$el.slidesContainer.prepend(lastSlideClone, ...cloneSetA)
        this.$el.slidesContainer.append(...cloneSetB, firstSlideClone)

        this.$el.slides = [
            lastSlideClone,
            ...cloneSetA,
            ...this.$el.slides,
            ...cloneSetB,
            firstSlideClone,
        ]
    }

    loopCheck() {
        // n.b. this is what makes the infinite loop possible
        // ... any time the user scrolls to the previous, or next, instance of the first slide
        // ... we reset the x coordinate back to its original value
        const shouldReset = this.resetCoords.includes(this.xCoord)
        const timeoutDelay = this.transitionDuration * 1000

        if (shouldReset) {
            this.isResetting = true

            window.setTimeout(() => {
                this.removeTransitionStyles()
                this.xCoord = this.xCoordDefault
                if(this.$el.fullCarousel) {
                    this.$el.slidesContainer.style.transform = `translateX(${ this.xCoord }%)`
                }
                
                window.setTimeout(() => {
                    this.setTransitionStyles()
                    this.isResetting = false
                }, timeoutDelay)
            }, timeoutDelay)
        }
    }

    next() {
        const nextSlideNum = this.currentSlide + 1 > this.numSlides
            ? 1
            : this.currentSlide + 1

        this.currentSlide = nextSlideNum
        this.xCoord -= this.slideWidth
        this.transition()
    }

    previous() {
        const prevSlideNum = this.currentSlide - 1 < 1
            ? this.numSlides
            : this.currentSlide - 1

        this.currentSlide = prevSlideNum
        this.xCoord += this.slideWidth
        this.transition()
    }

    removeTransitionStyles() {
        if (this.transitionStyle !== Carousel.SLIDE_TRANSITION) return

        this.$el.slidesContainer.style.removeProperty('transition')
        this.$el.slidesContainer.style.removeProperty('transform')
    }

    setCarouselData() {
        let options = {
            padding: true,
        }

        try {
            const userOptions = {
                fade: typeof this.$el.container.dataset.carouselFade !== 'undefined',
                padding: typeof this.$el.container.dataset.carouselPadding !== 'undefined',
            }

            options = {
                ...options,
                ...userOptions,
            }

        } catch (err) {
            console.warn('[CAROUSEL] Unable to parse the carousel options:', err)
        }

        switch (true) {
            case !options.padding:
                this.slideWidth = 100
                break

            case window.innerWidth >= 1440:
                this.slideWidth = 33
                break

            case window.innerWidth >= 1024:
                this.slideWidth = 56
                break

            case window.innerWidth >= 768:
                this.slideWidth = 75
                break

            default:
                this.slideWidth = 100
        }

        this.currentSlide = 1
        this.isResetting = false
        this.numSlides = this.$el.slides.length
        this.transitionDuration = 0.35 // in seconds
        this.transitionStyle = options.fade ? Carousel.FADE_TRANSITION : Carousel.SLIDE_TRANSITION
        this.xCoordDefault = -(this.slideWidth - ((100 - this.slideWidth) / 2)) - (this.slideWidth * 3)
        this.xCoord = this.xCoordDefault

        this.resetCoords = [
            this.xCoordDefault + (this.slideWidth * 3),
            this.xCoordDefault - (this.slideWidth * 3),
        ]
    }

    setStyles() {
        this.$el.slides.forEach((slideElem) => slideElem.style.minWidth = `${ this.slideWidth }%`)
        this.$el.innerContainer.style.visibility = 'visible'

        if (this.transitionStyle === Carousel.FADE_TRANSITION) {
            this.$el.slides.forEach((elem) => {
                elem.classList.add(Carousel.FADE_TRANSITION_CLASS)
            })
        }
    }

    setTransitionStyles() {
        if (this.transitionStyle !== Carousel.SLIDE_TRANSITION) return

        this.$el.slidesContainer.style.transform = `translateX(${ this.xCoordDefault }%)`
        this.$el.slidesContainer.style.transition = `transform ${ this.transitionDuration }s ease-out`
    }

    transition() {
        if (this.isResetting) return

        if (this.transitionStyle === Carousel.SLIDE_TRANSITION) {
            this.$el.slidesContainer.style.transform = `translateX(${ this.xCoord }%)`
        }
        
        if (this.transitionStyle === Carousel.FADE_TRANSITION) {
            this.$el.slides.forEach((elem, index) => {
                const isCurrentSlide = (index + 1) === this.currentSlide

                if (isCurrentSlide) {
                    elem.classList.add(Carousel.CURRENT_SLIDE_CLASS)
                } else {
                    elem.classList.remove(Carousel.CURRENT_SLIDE_CLASS)
                }
            })
        }

        this.updateCurrent()
        this.loopCheck()
    }

    updateCount() {
        if (this.$el.count) {
            this.$el.count.innerText = this.numSlides
        }
    }

    updateCurrent() {
        if (this.$el.current) {
            this.$el.current.innerText = this.currentSlide
        }
    }
}

/*
    dataVideoIcon
        - Plays "icon videos" when they are moused over.

    [EXAMPLE]
        <!-- HTML -->
        <video src="/mp4/foo.mp4" data-video-icon></video>

        <button type="button" data-video-icon>
            <video src="/mp4/foo.mp4"></video>
        </button>

        /// JS
        dataVideoIcon()
*/
function dataVideoIcon() {
    const targetElems = document.querySelectorAll('[data-icon-video]')

    function initVideo(videoElem, containerElem = videoElem) {
        videoElem.muted = true

        containerElem.addEventListener('mouseover', () => {
            videoElem.play()
        })
    }

    targetElems.forEach((elem) => {
        if (elem.tagName === 'VIDEO') {
            initVideo(elem)
        } else {
            // in case the <video> element is nested deeper in the HTML
            const nestedElem = elem.querySelector('video')

            if (elem) {
                initVideo(nestedElem, elem)
            }
        }
    })
}

function initDataApi() {
    dataCarousel()
    dataVideoIcon()
}

module.exports = {
    Carousel,
    CarouselControls,
    dataCarousel,
    dataVideoIcon,
    initDataApi,
}
