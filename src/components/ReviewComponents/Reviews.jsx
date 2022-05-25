import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './ReviewBlock.jsx';
import Testing from './reviewsExamples.js';
const axios = require('axios').default;

const Reviews = (props) => {
  console.log(props.id);
  const [reviews, setReviews] = useState(undefined);
  const [searchText, setSearch] = useState('');
  const [page, setPage] = useState('reviews');
  const [showAdd, setShow] = useState(false);
  const [currentNum, setCurrentNum] = useState(2);
  const [showing, setShowing] = useState([]);
  const [state, setState] = useState(2);

  const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}`
  useEffect(() => {
      axios({
        method: 'GET',
        url: url,
        headers: {authorization : process.env.REACT_APP_TOKEN},
      })
      .then((results) => {setReviews(results.data.results);})

  }, [url]);

  const searchButton = () => {
    alert(searchText);

  }
  const handleClickAddReview = () => { //add would need a request.
    setShow(true);
  }

  const handleSearchTextChange = (event) => { //search would need a request.
    setSearch(event.target.value);
    //add search functions later.
  }

  const handleCloseAdd = (event) => {
    setShow(false);
  }

  const showMore = () => { //change showing to include two more.

    setCurrentNum(currentNum + 2);

    setShowing(reviews.slice(0, currentNum));
  }

  const displayData = () => {
    // console.log('current', currentNum);
    // console.log(showing);
  }

  return (
    <div>
      <p>------------------------------------------------------</p>
      <h1 >Reviews</h1>

      <button onClick={handleClickAddReview}>Add Review</button>

      <form onSubmit={searchButton}>
        <label>
          <input placeholder="search" type="text" value={searchText} onChange={handleSearchTextChange} />
        </label>
        <input type="submit" value="Search" />
      </form>
      {showAdd !== false ? <button onClick={handleCloseAdd}>Go back</button> : <p></p>}
      {showAdd === false ? <p>showing: </p> : <p></p>}
      {showAdd === false ? <ReviewBlock data={reviews} num={currentNum} setNum={setCurrentNum} caps={5}/> : <AddReview show={showAdd} id={props.id}/>}
      {showAdd === false ? <button onClick={() => {showMore(); displayData();}} >show more</button> : <p></p>}

    </div>
  );
}

export default Reviews;