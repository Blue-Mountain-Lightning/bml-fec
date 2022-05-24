import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './OneReview.jsx';
import Testing from './reviewsExamples.js';
const axios = require('axios').default;

const Reviews = () => {
  const [reviews, setReviews] = useState('');
  const [searchText, setSearch] = useState('');
  const [page, setPage] = useState('reviews');

  const handleClickAddReview = () => {
    console.log('add review button clicked.');
  }

  const handleSearchTextChange = (event) => {
    setSearch({...searchText, searchText: event.target.value});
    //add search functions later.
  }

  //a function to get all reviews...initial planning
  useEffect(() => {
    console.log('test reviews', reviews);
    axios.get({
      method: 'get',
      url: process.env.REACT_APP_API,
      headers: {
         'Authorization': process.env.REACT_APP_TOKEN
      }
    })
    .then((result) => {
      console.log('wtf', result);
      setReviews(result);
    })
  });


  return (
    <div>
      <h1>Reviews</h1>

      <button onClick={handleClickAddReview}>Add Review</button>
      <AddReview />
      <p>Showing: </p>
      <Filter />
      <ReviewBlock data={reviews}/>



      <form>
        <label>
          <input placeholder="search" type="text" value={searchText} onChange={handleSearchTextChange} />
        </label>
      </form>

    </div>
  );
}

export default Reviews;