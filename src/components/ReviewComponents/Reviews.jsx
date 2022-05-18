import React from 'react';
import AddReview from './AddReview.jsx';

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

        <OneReview/>

        <p>Showing: </p>
      </div>

    );
  }
}

export default Reviews;