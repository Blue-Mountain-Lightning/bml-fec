/*
This components handles the UI of Related Items rows.
*/

import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ScrollButton from './ScrollButton';
import RowNav from './RowNav';

const CARD_WIDTH_REM = 19.75; // width of a Product Card in REM including gap

const convertRemToPixels = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


const ProductRow = ({
  products,
  Icon,
  iconHandler,
  iconHandlerClose
}) => {
  const cardWidth = convertRemToPixels(CARD_WIDTH_REM);
  const rowRef = useRef();
  const productRowRef = useRef();
  const winResizeDebouncer = useRef();

  const [carouselWidth, setCarouselWidth] = useState(0);
  const [maxScrollPos, setMaxScrollPos] = useState(0);
  const [scrollPos, setScrollPos] = useState(0);
  const [numVisibleCards, setNumVisibleCards] = useState(0);

  const handleArrowClick = (event, value) => {
    let newScrollPos = scrollPos;
    if (value === 'previous') {
      if (scrollPos >= maxScrollPos) { return; }
      newScrollPos += cardWidth;
    }
    if (value === 'next') {
      if (scrollPos <= -maxScrollPos) { return; }
      newScrollPos -= cardWidth;
    }
    setScrollPos(newScrollPos);
  }

  const handleResizeWindow = useCallback(() => {
    const { innerWidth } = window;

    let numProducts = products.length;
    let numVisibleCards = Math.floor((innerWidth - 48) / (cardWidth));

    // Set the number of cards that will fit on the screen at a given time
    if (numVisibleCards > numProducts) { numVisibleCards = numProducts; };
    if (numVisibleCards > 4) { numVisibleCards = 4; }; // no more than 4 cards
    if (numVisibleCards < 1) { numVisibleCards = 1; }; // no less than 1 card

    // card row width = width of all the cards + width of all the inner gaps
    const cardRowWidth = (numVisibleCards * cardWidth - convertRemToPixels(1));
    const newMaxOffset = (products.length - numVisibleCards) * cardWidth / 2;

    setCarouselWidth(cardRowWidth);
    setMaxScrollPos(newMaxOffset);
    setScrollPos(newMaxOffset);
    setNumVisibleCards(numVisibleCards);
  }, [cardWidth, products.length])


  useLayoutEffect(() => {
    // animate the carousel left or right when scrollPos is updated
    try {
      let elem = rowRef.current;
      const first = elem.getBoundingClientRect();
      elem.style.left = `${scrollPos}px`;
      const last = elem.getBoundingClientRect();
      const invert = first.x - last.x;
      elem.animate([
        { transform: `translateX(${invert}px)` },
        { transform: `translateX(0)` },
      ], {
        duration: 300,
        easing: 'cubic-bezier(0, 0, 0.32, 1)',
      });
    } catch (error) {
      // this fails during some tests
    }
  }, [scrollPos]);

  useLayoutEffect(() => {
    // set a new width for the carousel when window is resized
      let elem = productRowRef.current;
      elem.style.width = `${carouselWidth}px`;
    }, [carouselWidth]);

  useEffect(() => {
    handleResizeWindow();
    window.addEventListener('resize', () => {
      clearTimeout(winResizeDebouncer.current);
      winResizeDebouncer.current = setTimeout(handleResizeWindow, 20);
    });
  }, [handleResizeWindow]);

  const productsList = products.map(product => {
    if (!product?.id) { return product; };
    return (
      <ProductCard
        key={product.id}
        product={product}
        Icon={Icon}
        iconHandler={iconHandler}
        iconHandlerClose={iconHandlerClose}
      />
    )
  });

  return (
    <>
      <div className='product-row' ref={productRowRef}>
        <ScrollButton
          className='card-button card-prev'
          direction={'previous'}
          onClick={(e) => handleArrowClick(e, 'previous')}
          active={scrollPos < maxScrollPos}
        />
        <div className='products-list' ref={rowRef}>
          {productsList}
        </div>
        <ScrollButton
          className='card-buton card-next'
          direction={'next'}
          onClick={(e) => handleArrowClick(e, 'next')}
          active={scrollPos > -maxScrollPos}
        />
      </div>
      <RowNav
        numProducts={products.length}
        offset={scrollPos}
        maxOffset={maxScrollPos}
        cardWidth={cardWidth}
        numCards={numVisibleCards}
      />
    </>
  )
}

export default ProductRow;
