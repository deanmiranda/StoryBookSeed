import { FOCUS_ELEMENTS } from './constants';
export const hideElement = (element) => setDisplayStyle(element, 'none');
export const showElement = (element) => setDisplayStyle(element, 'block');
export const setDisplayStyle = (element, value) => {
    if (!element) return;
    element.style.display = value;
};

export const makeTabLoopInSection = (sectionWrapper) => {
    if (!sectionWrapper) return;
    const tabbableElements = sectionWrapper.querySelectorAll(FOCUS_ELEMENTS);
    makeTabLoopInElementList(tabbableElements, true);
};

const focusFromBack = (elements) => {
    for (let i = elements.length - 1; i >= 0; --i) {
        if (elements[i]) {
            elements[i].focus();
            break;
        }
    }
};

const focusFromBeginning = (elements) => {
    for (let i = 0; i < elements.length; ++i) {
        if (elements[i]) {
            elements[i].focus();
            break;
        }
    }
};

export const makeTabLoopInElementList = (elements, autoFocus) => {
    if (!elements) return;

    autoFocus && elements[0].focus();

    elements.forEach((item, index) => {
        const cntOfItems = elements.length;
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (index === 0 && e.shiftKey) {
                    focusFromBack(elements);
                    e.preventDefault();
                } else if (index === cntOfItems - 1 && !e.shiftKey) {
                    focusFromBeginning(elements);
                    e.preventDefault();
                }
            }
        });
    });
};
