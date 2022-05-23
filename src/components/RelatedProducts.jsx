import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import ProductCard from './ProductCard';

const HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  const cache = useRef({}); //
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [width, setWidth] = useState(0);

  const numCardsToShow = () => {
    let num = Math.floor(width / 480);
    console.log(num);
    return num > 0 ? num : 1;
  }

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  const handleResizeWindow = (e) => {
    const {width} = getWindowDimensions();
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

  const handleButtonClick = (e) => {
    console.log('click');
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
              <button className='card-button card-next' onClick={handleButtonClick}>
                <FaAngleLeft className='card-icon'/>
              </button>
              {products.map((p, i) => {
                if (i > numCardsToShow() - 1) { return };
                return (<ProductCard key={p.id} product={p} />)
              })}
              <button className='card-button card-prev' onClick={handleButtonClick}>
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
