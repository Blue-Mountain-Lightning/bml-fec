import { useState, useRef, useEffect, useLayoutEffect } from 'react';

import ProductCard from '../ProductCard';
import RowNav from './RowNav';
import ScrollButton from './ScrollButton';

const CARD_WIDTH = 376;

/*
This components handles the UI/X of Related Items rows.
*/
const ProductRow = ({products, offsetVar}) => {
  const rowRef = useRef();

  const [offset, setOffset] = useState(0);
  const [margin, setMargin] = useState(0);
  const [maxOffset, setMaxOffset] = useState(0);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

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

  const handleResizeWindow = () => {
    const { innerWidth } = window;

    let numProducts = products.length;
    let numCards = Math.floor(innerWidth / (CARD_WIDTH));


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

    const cardRowWidth = (numCards * CARD_WIDTH);
    const newMaxOffset = (products.length - numCards) * CARD_WIDTH / 2;

    setOffset(newMaxOffset);
    setMargin((innerWidth - cardRowWidth) / 2);
    setMaxOffset(newMaxOffset);
    setButtonState();
  }


  const handleButtonClick = (event, value) => {
    let newOffset = offset;
    if (value === 'previous') {
      if (offset >= maxOffset) {
        return;
      }
      newOffset += CARD_WIDTH;
    }

    if (value === 'next') {
      if (offset <= -maxOffset) {
        return;
      }

      newOffset -= CARD_WIDTH;
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
      <div className='product-row'>
        <div className='blank-side blank-left'
             style={{'width': `${margin}px`}}
             onClick={(e) => handleButtonClick(e, 'previous')}>
          <ScrollButton direction={'previous'} active={prevButton}/>
        </div >
        <div className='products-list horizontal-shifter' ref={rowRef}>
          {products.map(product => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className='blank-side blank-right'
             style={{'width': `${margin}px`}}
             onClick={(e) => handleButtonClick(e, 'next')}>
          <ScrollButton direction={'next'} active={nextButton}/>
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
