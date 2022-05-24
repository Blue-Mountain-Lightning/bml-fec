import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import ProductCard from '../ProductCard';
import utilities from './utilities';

const HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  const cache = useRef({}); //
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(0);
  const [rowPosition, setRowPosition] = useState(0);

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
          const IdsResponse = await fetch(relatedIDsEndpoint, HEADERS)
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
          return (cache.current[id]) ? cache.current[id] : fetch(url, HEADERS);
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

  const handleButtonClick = (e, name) => {
    const cardsThatFit = utilities.numCardsThatFit(width);
    if (name === 'increment') {
      if (rowPosition === products.length - 1) {
        setRowPosition(0);
        return;
      }

      setRowPosition(rowPosition + 1);
    }
    if (name === 'decriment') {
      if (rowPosition === 0) {
        setRowPosition(products.length - 1);
        return;
      }
      setRowPosition(rowPosition - 1);
    }
  }

  const renderProductRow = () => {
    const cardsThatFit = utilities.numCardsThatFit(width);
    let end = rowPosition + cardsThatFit;
    let rowEntries;
    if (end > products.length) {
      let firstCut = products.slice(rowPosition, products.length);
      let secondCut = products.slice(0, end - products.length);
      rowEntries = firstCut.concat(secondCut);
    } else {
      rowEntries = products.slice(rowPosition, end);
    }

    return rowEntries.map((p, i) => {
      if (i > utilities.numCardsThatFit(width) - 1) { return };
      return (<ProductCard key={p.id} product={p} />)
    })
  }

  if (loaded) {
    return (
      <div className="section">
        <div className="container-large">
          <div className="page-padding">
            <h1 className='center-heading'>You may also like</h1>
            {/* This is just a palceholder style for now */}
            <div className='product-row'>
              {/* Some code here to get viewport width and
              adjust amount of shown elements to fit in that*/}
              <button className='card-button card-next'
                      onClick={(e) => handleButtonClick(e, 'decriment')}
              >
                <FaAngleLeft className='card-icon'/>
              </button>
              {renderProductRow()}
              <button className='card-button card-prev'
                      onClick={(e) => handleButtonClick(e, 'increment')}
              >
                <FaAngleRight className='card-icon'/>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RelatedProducts;
