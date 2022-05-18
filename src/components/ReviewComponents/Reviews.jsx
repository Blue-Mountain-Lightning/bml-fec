import React from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './OneReview.jsx';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  render() {

    return (
      <div>
        <h1>Review</h1>

        <AddReview/>

        <Filter/>

        <ReviewBlock/>

        <p>Showing: </p>
      </div>

    );
  }
}

export default Reviews;