import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import utilities from './utilities';
import ProductCard from '../ProductCard';

const REQUEST_HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  const cache = useRef({});
  const rowElementRef = useRef([]);
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(0);
  const [rowPosition, setRowPosition] = useState(0);
  const [slideBoundary, setSlideBoundary] = useState({});

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
    const offsetVar = '--related-products-shift-offset';
    const currentCSSValue = getComputedStyle(document.documentElement)
      .getPropertyValue(offsetVar);
    let CSSValueInteger = Number(currentCSSValue.slice(0, currentCSSValue.length - 2));

    let boundary = (utilities.getTotalCardsWidth(width, products.length) -
      utilities.getCardsWidth(width, products.length)) / 2;
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
    const offset = (direction === 'left') ? 376 : -376;

    utilities.animatedHorizontalShift(
      element,
      offsetVar,
      offset
    );

    if (direction === 'increment') {
      if (rowPosition === products.length - 1) {
        setRowPosition(0);
        return;
      }

      setRowPosition(rowPosition + 1);
    }
    if (direction === 'decriment') {
      if (rowPosition === 0) {
        setRowPosition(products.length - 1);
        return;
      }
      setRowPosition(rowPosition - 1);
    }
  }

  const renderProductRow = () => {
    const cardsThatFit = utilities.numCardsThatFit(width, products.length);
     let end = rowPosition + cardsThatFit;
     let rowEntries;
     if (end > products.length) {
       let firstCut = products.slice(rowPosition, products.length);
       let secondCut = products.slice(0, end - products.length);
       rowEntries = firstCut.concat(secondCut);
     } else {
       rowEntries = products.slice(rowPosition, end);
     }

    rowEntries = products.map((p, i) => {
      // if (i > utilities.numCardsThatFit(width) - 1) { return };
      let element = <ProductCard key={p.id} product={p} />;
      return element;
    })
    return rowEntries;
  }


  if (loaded) {
    const marginWidth = utilities.getMarginWidth(width, products.length);
    const numCards = utilities.numCardsThatFit(width, products.length);

    // TODO Clean up/refactor this section or put it somewhere else
    // It tries to ensure that the slider view always lines up on a whole card
    const offsetVar = '--related-products-shift-offset';
    const currentCSSValue = getComputedStyle(document.documentElement)
      .getPropertyValue(offsetVar);
    let CSSValueInteger = Number(currentCSSValue.slice(0, currentCSSValue.length - 2));
    if (products.length % 2 !== numCards % 2) {
      CSSValueInteger = 188;
    } else {
      CSSValueInteger = 0;
    }

    document.documentElement.style.setProperty(offsetVar, `${CSSValueInteger}px`);

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
