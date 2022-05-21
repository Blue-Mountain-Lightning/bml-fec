import React from 'react';
import { useState, useEffect, useRef } from 'react';

import ProductCard from './ProductCard';

const HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  const requestCache = useRef({}); //
  const relatedProductsCache = useRef({});  // this caches all products that have previous been a related product

  let [loaded, setLoaded] = useState(false);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      // if the current product has already been viewed, then load it's related products object from the cache
      if (!product.id) { return; };
      try {
        let productIDs;
        // Fetch array of product ID's which are related to the current product

        const relatedProductsURL = `${process.env.REACT_APP_API}products/${product.id}/related`;
        if (requestCache.current[relatedProductsURL]) {
          productIDs = requestCache.current[relatedProductsURL];
        } else {
          const IdsResponse = await fetch(relatedProductsURL, HEADERS)
          let parsedResponse = await IdsResponse.json();
          productIDs = Array.from(new Set(parsedResponse));
          requestCache.current[relatedProductsURL] = productIDs;
        }

        // Fetch product information for each related product
        const productRequests = productIDs.map(id => {
          const url = `${process.env.REACT_APP_API}products/${id}`;
          if (requestCache.current[id]) { console.log('using cache') };
          return (requestCache.current[id]) ? requestCache.current[id] : fetch(url, HEADERS);
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
        responsesData.forEach(info => requestCache.current[info.id] = info);

        // Set related product array to products state
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

  if (loaded) {
    return (
      <div>
        <h2>Related Products</h2>
          {/* This is just a palceholder style for now */}
          <div style={{'display': 'flex', 'flexDirection': 'row', "gap": "48px"}}>
            {products.map(p => (<ProductCard key={p.id} product={p} />))}
          </div>
      </div>
    );
  }
}

export default RelatedProducts;
