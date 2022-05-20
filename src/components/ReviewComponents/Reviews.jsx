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
  handleAddReview() {
    alert('you clicked the add review button');
  }

  render() {

    return (
      <div>
        <h1>Review</h1>

        <button onClick={this.handleAddReview} className="addreviewbutton">Add Review</button>

        <Filter/>

        <ReviewBlock/>

        <p>Showing: </p>
      </div>

    );
  }
}

export default Reviews;