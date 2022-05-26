/*
 * Utility functions for the RelatedProducts and YourOutfit components.
 */

const utilities = {
  /**
   * Returns the width and height of the current window as an object.
   * @function getWindowDimensions
   */
  getWindowDimensions: () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  },

  /**
   * Returns the number of cards to be shown in a product-row.
   * @function numCardsThatFit
   * @param {[int]} width  The width of the viewport.
   */
  numCardsThatFit: (width, numProducts) => {
    let factor = Math.floor(width / 408);

    // The return value should never be larger than the number
    // of cards that can actually be displayed.
    if (factor > numProducts) {
      factor = numProducts;
    }

    if (factor > 4) {
      return 4;
    }

    if (factor < 1) {
      return 1;
    }

    return factor;
  },

  /**
   * Returns the width of the margin of a 'product-row' element.
   * @function getMarginWidth
   * @param {[int]} width  The width of the viewport.
   */
  getMarginWidth: (width, numProducts) => {
    let cardsWidth = utilities.getCardsWidth(width, numProducts);
    let marginWidth = (width - cardsWidth) / 2 - 8;
    return String(marginWidth);
  },

  /**
   * Returns the width of all the product cards lined up.
   * @function getCardsWidth
   * @param {[int]} width  The width of the viewport.
   */
  getCardsWidth: (width, numProducts) => {
    let numCards = utilities.numCardsThatFit(width, numProducts);
    let cardsWidth = (numCards * 360) + ((numCards + 1) * 16);
    return cardsWidth;
  },


  /**
   * Returns the width required to display all products at once.
   * @function getCardsWidth
   * @param {[int]} numProducts The total number of products.
   */
  getTotalCardsWidth: (width, numProducts) => {
    let cardsWidth = (numProducts * 360) + ((numProducts + 1) * 16);
    return cardsWidth;
  },

  /**
   * Returns the width of the margin of a 'product-row' element.
   * @function animatedHorizontalShift
   * @param {[HTML Entity]} element The element to be shifted.
   * @param {[String]} cssVar The css variable assigned to the transform.
   * @param {[Number]} shiftAmount The css variable assigned to the transform.
   */
  animatedHorizontalShift: (element, offsetVar, shiftAmount) => {
    // Measure initial position of element
    const first = element.getBoundingClientRect();

    // Get the current css offset value and increase or decrease it,
    // moving the element to it's new location
    const currentCSSValue = getComputedStyle(document.documentElement)
      .getPropertyValue(offsetVar);

    let CSSValueInteger = Number(currentCSSValue.slice(0, currentCSSValue.length - 2));

    CSSValueInteger += shiftAmount;
    console.log(CSSValueInteger);

    document.documentElement.style.setProperty(offsetVar, `${CSSValueInteger}px`);

    // Measure the position of the element after the move
    const last = element.getBoundingClientRect();

    // Calculate the distance it has moved
    const invert = first.x - last.x;

    // Move the element back to the initial position
    element.style.transform = `translateX(${invert}px)`;

    // Animate the element back to the new position
    element.style.transform = '';

    setTimeout(() => {
      const p = element.removeChild(element.children[0]);
      element.prepend(p);
    }, 600);


    // TODO Loop the scroll back to the beginning
  }
}

export default utilities;
