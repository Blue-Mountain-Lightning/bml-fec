import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './OneReview.jsx';

const Reviews = () => {
  const [values, setValues] = useState({
    searchText: ''
  });

  const addReview = () => {
    console.log('add review button clicked.');
  }

  const handleSearchTextChange = (event) => {
    setValues({...values, searchText: event.target.value});
    //add search functions later.
  }

  //a function to get all reviews...initial planning


  return (
    <div>
      <h1>Reviews</h1>

      <button onClick={addReview}>Add Review</button>

      <p>Showing: </p>

      <form>
        <label>
          <input placeholder="search" type="text" value={values.searchText} onChange={handleSearchTextChange} />
        </label>
      </form>

      <ReviewBlock />
    </div>
  );
}

export default Reviews;