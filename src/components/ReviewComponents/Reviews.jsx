import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './ReviewBlock.jsx';
import Testing from './reviewsExamples.js';
const axios = require('axios').default;

const Reviews = () => {
  const [reviews, setReviews] = useState(Testing.reviews.results);
  const [searchText, setSearch] = useState('');
  const [page, setPage] = useState('reviews');
  const [showAdd, setShow] = useState(false);
  //keeping track of number of reviews showing.
  const [currentNum, setCurrentNum] = useState(2);
  const [showing, setShowing] = useState(Testing.reviews.results.slice(0,2));

  let url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews'

  useEffect(() => {
    // fetch(url, {
    //   method: 'GET',
    //   headers: { 'Authorization': process.env.REACT_APP_TOKEN }
    // })
    //   .then(response => console.log(response))
    //   .then(data => {
    //     console.log(data)
    //   })
  });


  const handleClickAddReview = () => { //add would need a request.
    console.log('add review button clicked.');
    setShow(true);
  }

  const handleSearchTextChange = (event) => { //search would need a request.
    setSearch({...searchText, searchText: event.target.value});
    //add search functions later.
  }

  const handleCloseAdd = (event) => {
    setShow(false);
  }

  const showMore = () => { //change showing to include two more.

    setCurrentNum(currentNum + 2);

    setShowing(Testing.reviews.results.slice(0, currentNum));
  }

  const displayData = () => {
    // console.log('current', currentNum);
    // console.log(showing);
  }

  //a function to get all reviews...initial planning
  useEffect(() => {
    // axios.get({
    //   method: 'get',
    //   url: process.env.REACT_APP_API,
    //   headers: {
    //      'Authorization': process.env.REACT_APP_TOKEN
    //   }
    // })
    // .then((result) => {
    //   console.log('req stuff api', result);
    //   // setReviews(result);
    // })
    // .catch((err) => {
    //   console.log('ERRORRRRRR', err);
    // })

    // console.log('showing', showing);
  });

  return (
    <div>
      <p>------------------------------------------------------</p>
      <h1>Reviews</h1>

      <button onClick={handleClickAddReview}>Add Review</button>

      <form>
        <label>
          <input placeholder="search" type="text" value={searchText} onChange={handleSearchTextChange} />
        </label>
      </form>
      {showAdd !== false ? <button onClick={handleCloseAdd}>Go back</button> : <p></p>}
      {showAdd === false ? <p>showing: </p> : <p></p>}
      {showAdd === false ? <ReviewBlock data={showing} num={currentNum} setNum={setCurrentNum} caps={5}/> : <AddReview show={showAdd}/>}

      <button onClick={() => {showMore(); displayData();}} >show more</button>
    </div>
  );
}

export default Reviews;