import React from 'react';

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    }
  }

  render() {
    // TODO implement routing
    // On click of a Product in ProductList, go to ProductDetail
    return (
      <h1>This is the Product List Component</h1>
      // map products to ProductDetail components
    );
  }
}

export default ProductList;