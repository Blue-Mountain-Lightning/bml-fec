import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import utilities from './utilities';
import ProductCard from '../ProductCard';
import {IMAGE_WIDTH, IMAGE_GAP} from './utilities.js';

const REQUEST_HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};
const OFFSET_VAR = '--related-products-shift-offset';
const CARD_WIDTH = IMAGE_WIDTH + IMAGE_GAP;

const RelatedProducts = ({product}) => {
  // refs
  const cache = useRef({});
  const rowElementRef = useRef([]);

  // state
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(0);

  // other assignments
  const marginWidth = utilities.getMarginWidth(width, products.length);
  const numCards = utilities.numCardsThatFit(width, products.length);

  const handleResizeWindow = (e) => {
    const {width} = utilities.getWindowDimensions();
    setWidth(width);
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

  const handleButtonClick = (event, direction) => {

    let {CSSValueInteger, boundary}
      = utilities.scrollStatus(width, OFFSET_VAR, products.length);

    if (CSSValueInteger >= boundary && direction === 'left') {
      console.log('At end of scroll view on right');
      return;
    }

    if (CSSValueInteger <= -boundary && direction === 'right') {
      console.log('At end of scroll view on left');
      return;
    }

    const element = rowElementRef.current;
    // TODO: Can the width to be shifted be found programatically?
    const offset = (direction === 'left') ? CARD_WIDTH : -CARD_WIDTH;

    utilities.animatedHorizontalShift(
      element,
      OFFSET_VAR,
      offset
    );
  }

  const renderProductRow = () => {
    let rowEntries = products.map((p, i) => {
      let element = <ProductCard key={p.id} product={p} />;
      return element;
    })
    return rowEntries;
  }

  const setInitialOffset = (marginWidth, offsetVar, numCards) => {
    let {boundary} = utilities.scrollStatus(width, OFFSET_VAR, products.length);
    document.documentElement.style.setProperty(offsetVar, `${boundary}px`);
  }

  if (loaded) {
    setInitialOffset(marginWidth, OFFSET_VAR, numCards);

    return (
      <>
        <h1 className='center-heading'>You may also like</h1>
          <div className='product-row'>
            <div className='blank-side blank-left'
                 style={{'width': `${marginWidth}px`}}
                 onClick={(e) => handleButtonClick(e, 'left')}>
              <button className='card-button card-next'>
                <FaAngleLeft className='card-icon'/>
              </button>
            </div >
          <div className='products-list horizontal-shifter' ref={rowElementRef}>
            {renderProductRow()}
          </div>
          <div className='blank-side blank-right'
               style={{'width': `${marginWidth}px`}}
               onClick={(e) => handleButtonClick(e, 'right')}>
            <button className='card-button card-prev'>
              <FaAngleRight className='card-icon'/>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default RelatedProducts;
