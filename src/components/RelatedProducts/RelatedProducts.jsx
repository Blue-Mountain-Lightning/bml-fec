import React from 'react';
import { useState, useEffect, useRef } from 'react';

import ProductCard from '../ProductCard';
import ScrollButton from './ScrollButton';
import utilities from './utilities';

import {IMAGE_WIDTH, IMAGE_GAP} from './utilities.js';

const CARD_WIDTH = IMAGE_WIDTH + IMAGE_GAP;
const OFFSET_VAR = '--related-products-shift-offset';
const REQUEST_HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  // refs
  const cache = useRef({});
  const rowElementRef = useRef([]);

  // state
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [scrollLimitReached, setScrollLimitReached] = useState({});

  // other assignments
  const marginWidth = utilities.getMarginWidth(viewportWidth, products.length) + 4;

  const handleResizeWindow = (e) => {
    const {width} = utilities.getWindowDimensions();
    setViewportWidth(width);
  }

  useEffect(() => {
    handleResizeWindow();

    window.addEventListener("resize", handleResizeWindow);

    const fetchRelatedProducts = async () => {
      if (!product.id) { return; };

      try {
        let relatedProductIDs;
        // Fetch related product IDs or load from cache
        const relatedIDsEndpoint =
          `${process.env.REACT_APP_API}products/${product.id}/related`;

        if (cache.current[relatedIDsEndpoint]) {
          relatedProductIDs = cache.current[relatedIDsEndpoint];
        } else {
          const IdsResponse = await fetch(relatedIDsEndpoint, REQUEST_HEADERS)
          let parsedResponse = await IdsResponse.json();

          // Remove any duplicate IDs
          relatedProductIDs = new Set(parsedResponse);

          // No related products should be the same as the overview product
          if (relatedProductIDs.has(product.id)) {
            relatedProductIDs.delete(product.id)
          }
          relatedProductIDs = Array.from(relatedProductIDs);
          cache.current[relatedIDsEndpoint] = relatedProductIDs;
        }

        // Fetch information about related products or load from cache
        const productRequests = relatedProductIDs.map(id => {
          const url = `${process.env.REACT_APP_API}products/${id}`;
          return (cache.current[id]) ? cache.current[id] : fetch(url, REQUEST_HEADERS);
        })

        try {
          const productsResponse = await Promise.all(productRequests);
          const responsePromises = productsResponse.map(response => {
            try {
              return response.json();
            } catch {
              return response;
            }
          });

          const responsesData = await Promise.all(responsePromises);
          responsesData.forEach(info => cache.current[info.id] = info);

          // Set state and complete the loading phase.
          setProducts(responsesData);
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error)
      }
    };

    fetchRelatedProducts();
  }, [product])

  const checkScrollLimit = () => {
    let {CSSValueInteger: currentCSSVarValue, boundary}
      = utilities.scrollStatus(viewportWidth, OFFSET_VAR, products.length);

    const boundaryMargin = 20; // Because I'm paranoid
    let scrollLimit = scrollLimitReached;
    if (currentCSSVarValue >= boundary - boundaryMargin) {
      scrollLimit.previous = true;
    } else {
      scrollLimit.previous = false;
    }

    if (currentCSSVarValue <= -boundary + boundaryMargin) {
      scrollLimit.next = true;
    } else {
      scrollLimit.next = false;
    }

    setScrollLimitReached(scrollLimit);
  }

  const handleButtonClick = (event, direction) => {
    let {CSSValueInteger, boundary}
      = utilities.scrollStatus(viewportWidth, OFFSET_VAR, products.length);

    if (CSSValueInteger >= boundary - 20 && direction === 'previous') {
      return;
    }

    if (CSSValueInteger <= -boundary + 20 && direction === 'next') {
      return;
    }


    const element = rowElementRef.current;
    const offset = (direction === 'previous') ? CARD_WIDTH : -CARD_WIDTH;
    utilities.animatedHorizontalShift(
      element,
      OFFSET_VAR,
      offset
    );

    checkScrollLimit();
  }


  if (loaded) {
    if (products.length === 0) { return <></> };
    utilities.setInitialOffset(viewportWidth, OFFSET_VAR, products.length);
    return (
      <>
        <h1 className='center-heading'>You may also like</h1>
          <div className='product-row'>
            <div className='blank-side blank-left'
                 style={{'width': `${marginWidth}px`}}
                 onClick={(e) => handleButtonClick(e, 'previous')}>
              <ScrollButton direction={'previous'} isActive={scrollLimitReached.previous} />
            </div >
          <div className='products-list horizontal-shifter' ref={rowElementRef}>
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
          <div className='blank-side blank-right'
               style={{'width': `${marginWidth}px`}}
               onClick={(e) => handleButtonClick(e, 'next')}>
            <ScrollButton direction={'next'} isActive={scrollLimitReached.next} />
          </div>
        </div>
      </>
    );
  }
}

export default RelatedProducts;
