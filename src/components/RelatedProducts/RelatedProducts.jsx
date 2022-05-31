import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {MdStar} from 'react-icons/md';

import ProductRow from './ProductRow';
import ComparisonModal from './Modals/ComparisonModal';

const OFFSET_VAR = '--related-products-shift-offset';
const OFFSET_CLASS = 'related-products-shifter';
const REQUEST_HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  // refs
  const cache = useRef({});

  // state
  const [loaded, setLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
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

  const activateModal = (relatedProduct) => {
    setModal(relatedProduct);
  }

  const deactivateModal = () => {
    setModal(null);
  }

  if (loaded) {
    let Modal;
    if (products.length === 0) { return null; };

    if (modal !== null) {
      document.body.classList.add('scroll-lock');
      Modal = (
        <ComparisonModal
          a={modal}
          b={product}
          handleClose={deactivateModal}
        />
      )
    } else {
      Modal = <div className='hide'></div>
      document.body.classList.remove('scroll-lock');
    }

    return (
      <>
        {/* modal ? Modal : null */}
        { Modal }
        <h1 className='center-heading'>You may also like</h1>
        <ProductRow
          products={products}
          offsetClass={OFFSET_CLASS}
          offsetVar={OFFSET_VAR}
          Icon={MdStar}
          iconHandler={activateModal}
          iconHandlerClose={deactivateModal}
        />
      </>
    );
  }
}

export default RelatedProducts;
