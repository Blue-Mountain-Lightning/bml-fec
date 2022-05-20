import React from 'react';
import ProductOverview from './ProductOverview';
import RelatedProducts from './RelatedProducts';
import QuestionsAnswers from './QuestionsAnswers';
import Reviews from '../components/ReviewComponents/Reviews.jsx';

class ProductDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    }
  }

  render() {
    return (
      <div>
        <h1>This is the Product Detail Component</h1>
        <ProductOverview />
        <RelatedProducts />
        <QuestionsAnswers />
        <Reviews />



      </div>

    )
  }
}

export default ProductDetail;