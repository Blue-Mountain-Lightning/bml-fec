import React from 'react';

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

        <Review/>

        <p>Showing: </p>
      </div>

    );
  }
}

export default Reviews;