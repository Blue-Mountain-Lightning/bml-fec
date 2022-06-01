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
  offsetClass,
  offsetVar,
  Icon,
  iconHandler,
  iconHandlerClose
}) => {
  const cardWidth = convertRemToPixels(CARD_WIDTH_REM);
  const rowRef = useRef();

  const [contentWidth, setContentWidth] = useState(false);
  const [maxOffset, setMaxOffset] = useState(0);
  const [offset, setOffset] = useState(0);
  const [numCards, setNumCards] = useState(0);

  const handleArrowClick = (event, value) => {
    let newOffset = offset;
    if (value === 'previous') {
      if (offset >= maxOffset) { return; }
      newOffset += cardWidth;
    }

    if (value === 'next') {
      if (offset <= -maxOffset) { return; }
      newOffset -= cardWidth;
    }

    setOffset(newOffset);
  }

  const handleResizeWindow = useCallback(() => {
    const { innerWidth } = window;

    let numProducts = products.length;
    let numCardsThatFit = Math.floor((innerWidth - 48) / (cardWidth));

    // Set the number of cards that will fit on the screen at a given time
    if (numCardsThatFit > numProducts) { numCardsThatFit = numProducts; };
    if (numCardsThatFit > 4) { numCardsThatFit = 4; }; // no more than 4 cards
    if (numCardsThatFit < 1) { numCardsThatFit = 1; }; // no less than 1 card

    // card row width = width of all the cards + width of all the inner gaps
    const cardRowWidth = (numCardsThatFit * cardWidth - convertRemToPixels(1));
    const newMaxOffset = (products.length - numCardsThatFit) * cardWidth / 2;

    setContentWidth(cardRowWidth);
    setMaxOffset(newMaxOffset);
    setOffset(newMaxOffset);
    setNumCards(numCardsThatFit);
  }, [cardWidth, products.length])

  useLayoutEffect(() => {
    try {
      let elem = rowRef.current;
      const first = elem.getBoundingClientRect();
      document.documentElement.style.setProperty(offsetVar, `${offset}px`);
      const last = elem.getBoundingClientRect();
      const invert = first.x - last.x;
      elem.style.transform = `translateX(${invert}px)`;
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

  }, [offset, offsetVar]);

  useEffect(() => {
    handleResizeWindow();
    window.addEventListener('resize', handleResizeWindow);
  }, [products, handleResizeWindow]);

  // set the scroll buttons to be on/off based on scroll position
  let prevButton = (offset >= maxOffset) ? false : true;
  let nextButton = (offset <= -maxOffset) ? false : true;

  console.log(numCards);

  return (
    <>
    <div className='product-row' style={{'width': `${contentWidth}px`}}>
      <button
        onClick={(e) => handleArrowClick(e, 'previous')}
        className='card-button card-prev'
      >
        <ScrollButton direction={'previous'} active={prevButton} />
      </button>
      <div className={`products-list ${offsetClass}`} ref={rowRef}>
        {products.map(product => {
          if (!product?.id) { // allow components through
            return product;
          }

          return (
            <ProductCard key={product.id}
                         product={product}
                         Icon={Icon}
                         iconHandler={iconHandler}
                         iconHandlerClose={iconHandlerClose}
            />
          )
        })}
      </div>
      <button
        onClick={(e) => handleArrowClick(e, 'next')}
        className='card-button card-next'
      >
        <ScrollButton direction={'next'} active={nextButton} />
      </button>
    </div>
      { products.length > 1 ?
        <RowNav
          numProducts={products.length}
          offset={offset}
          maxOffset={maxOffset}
          cardWidth={cardWidth}
          numCards={numCards}
        /> :
          null
      }
    </>
  )
}

export default ProductRow;
