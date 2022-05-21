import React from 'react';
import { useState, useEffect, useRef } from 'react';

import ProductCard from './ProductCard';

const HEADERS = {headers: {'Authorization': process.env.REACT_APP_TOKEN}};

const RelatedProducts = ({product}) => {
  const IDCache = useRef({}); // cache of related id's for a particular product
  const infoCache = useRef({}); // cache of product infos for previously seen products
  const relatedProductsCache = useRef({});  // this caches all products that have previous been a related product

  let [loaded, setLoaded] = useState(false);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      // if the current product has already been viewed, then load it's related products object from the cache
      if (!product.id) { return; };
      try {
        let productIDs;
         if (IDCache.current[product.id]) {
        // Check the IDCache to see if related ID's are stored for current product
           productIDs = IDCache.current[product.id];
         } else {
          // Fetch array of product ID's which are related to the current product
          const relatedProductsURL = `${process.env.REACT_APP_API}products/${product.id}/related`;
          const IdsResponse = await fetch(relatedProductsURL, HEADERS)
          let parsedResponse = await IdsResponse.json();
          productIDs = Array.from(new Set(parsedResponse));
          IDCache.current[product.id] = productIDs;
        }

        // Fetch product information for each related product
        const productRequests = productIDs.map(id => {
          if (infoCache.current[id]) {
            return infoCache.current[id];
          }

          const url = `${process.env.REACT_APP_API}products/${id}`;
          return fetch(url, HEADERS);
        })
        const productsResponse = await Promise.all(productRequests);
        const responsePromises = productsResponse.map(response => {
          try {
            return response.json();
          } catch {
            return response;
          }
        });
        const responsesData = await Promise.all(responsePromises);
        responsesData.forEach(info => infoCache.current[info.id] = info);

        // Set related product array to products state
        setProducts(responsesData);
        setLoaded(true);
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
