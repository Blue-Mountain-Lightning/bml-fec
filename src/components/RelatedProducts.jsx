import React from 'react';
import { useState, useEffect } from 'react';

import ProductCard from './ProductCard';

const HEADERS = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } };

const RelatedProducts = ({ product }) => {
  let [loaded, setLoaded] = useState(false);
  let [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (product.id) {
        try {
          // Fetch array of product ID's which are related to the current product
          const relatedProductsURL = `${process.env.REACT_APP_API}products/${product.id}/related`;
          const IdsResponse = await fetch(relatedProductsURL, HEADERS)
          let productIds = await IdsResponse.json();
          productIds = Array.from(new Set(productIds));

          // Fetch product information for each related product
          const productRequests = productIds.map(id => {
            const url = `${process.env.REACT_APP_API}products/${id}`;
            return fetch(url, HEADERS);
          })
          const productsResponse = await Promise.all(productRequests);
          const responsePromises = productsResponse.map(response => response.json());
          const responsesData = await Promise.all(responsePromises);

          // Set related product array to products state
          setProducts(responsesData);
          setLoaded(true);
        } catch (error) {
          console.log(error)
        }
      }

    };

    fetchRelatedProducts();
  }, [product])

  if (loaded) {
    return (
      <div>
        <h2>Related Products</h2>
        {/* This is just a palceholder style for now */}
        <div style={{ 'display': 'flex', 'flexDirection': 'row', "gap": "48px" }}>
          {products.map(p => (<ProductCard key={p.id} product={p} />))}
        </div>
      </div>
    );
  }
}

export default RelatedProducts;
