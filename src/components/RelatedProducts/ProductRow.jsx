import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import ProductCard from '../ProductCard/ProductCard';
// import RowNav from './RowNav';
import ScrollButton from './ScrollButton';

const CARD_WIDTH_REM = 19.75; // width of a Product Card in REM
/*
This components handles the UI/X of Related Items rows.
*/
const ProductRow = ({products, offsetVar, Icon, iconHandler, iconHandlerClose}) => {
  const rowRef = useRef();

  const [offset, setOffset] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);
  const [cardWidth, setCardWidth] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);

  const setButtonState = (newOffset) => {
    newOffset = newOffset || offset;
    if (newOffset >= maxOffset) {
      setPrevButton(false);
    } else {
      setPrevButton(true);
    }

    if (newOffset <= -maxOffset) {
      setNextButton(false);
    } else {
      setNextButton(true);
    }
  }

  const convertRemToPixels = (rem) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  const handleResizeWindow = () => {
    const cardWidth = convertRemToPixels(CARD_WIDTH_REM);
    const { innerWidth } = window;

    let numProducts = products.length;
    let numCards = Math.floor(innerWidth / (cardWidth));

    // Set the number of cards that will fit on the screen at a given time
    if (numCards > numProducts) {
      numCards = numProducts;
    }
    if (numCards > 4) {
      numCards = 4;
    }
    if (numCards < 1) {
      numCards = 1;
    }

    // remove 1 rem from total card width because we only count inner gaps
    const cardRowWidth = (numCards * cardWidth - convertRemToPixels(1));
    const newMaxOffset = (products.length - numCards) * cardWidth / 2;

    setContentWidth(cardRowWidth);
    setCardWidth(cardWidth);
    setOffset(newMaxOffset);
    setMaxOffset(newMaxOffset);
    setPrevButton(false);
  }

  const handleButtonClick = (event, value) => {
    let newOffset = offset;
    if (value === 'previous') {
      if (offset >= maxOffset) {
        return;
      }
      newOffset += cardWidth;
    }

    if (value === 'next') {
      if (offset <= -maxOffset) {
        return;
      }

      newOffset -= cardWidth;
    }

    setOffset(newOffset);
    setButtonState(newOffset);
  }

  useLayoutEffect(() => {
    // FLIP animate the movement when the offset state is updated.
    let element = rowRef.current;
    const first = element.getBoundingClientRect();
    document.documentElement.style
      .setProperty(offsetVar, `${offset}px`);
    const last = element.getBoundingClientRect();
    const invert = first.x - last.x;
    element.style.transform = `translateX(${invert}px)`;
    element.animate([
      { transform: `translateX(${invert}px)` },
      { transform: `translateX(0)` },
    ], {
      duration: 300,
      easing: 'cubic-bezier(0, 0, 0.32, 1)',
    });
    setButtonState();

  }, [offset, offsetVar]);

  useEffect(() => {
    handleResizeWindow();
    window.addEventListener('resize', handleResizeWindow);
  }, [products]);

  return (
    <>
      <div className='product-row' style={{'width': `${contentWidth}px`}}>
        <div
          className='card-button card-prev'
          onClick={(e) => handleButtonClick(e, 'previous')}
        >
          <ScrollButton direction={'previous'} active={prevButton} />
        </div>
        <div className='products-list horizontal-shifter' ref={rowRef}>
          {products.map(product => (
            <ProductCard key={product.id}
                         product={product}
                         Icon={Icon}
                         iconHandler={iconHandler}
                         iconHandlerClose={iconHandlerClose}
            />
          ))}
        </div>
        <div
          className='card-button card-next'
          onClick={(e) => handleButtonClick(e, 'next')}
        >
          <ScrollButton direction={'next'} active={nextButton} />
        </div>
      </div>
      {/*
      <div className='product-navdots'>
        <RowNav numProducts={products.length} offset={offset} />
      </div>
      */}
    </>
  )
}

export default ProductRow;
