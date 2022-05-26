import React, { useState, useEffect } from 'react';
import AddReview from './AddReview.jsx';
import Filter from './Filter.jsx';
import ReviewBlock from './ReviewBlock.jsx';
import './Review1.css';
const axios = require('axios').default;

const Reviews = (props) => {
  const [reviews, setReviews] = useState(undefined);
  const [searchText, setSearch] = useState('');
  const [page, setPage] = useState('reviews');
  const [showAdd, setShow] = useState(false);
  const [currentNum, setCurrentNum] = useState(2);
  const [state, setState] = useState(2);

  const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}`
  useEffect(() => {
      axios({
        method: 'GET',
        url: url,
        headers: {authorization : process.env.REACT_APP_TOKEN},
      })
      .then((results) => {setReviews(results.data.results);})
      .catch((err) => {
        console.log(err)});
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

  const showMore = () => {
    setCurrentNum(currentNum + 2);
    //if no more,
  }

  return (
    <div className="reviewsMain">
      <div className="leftSide">
        <h1 className="reviewText">Reviews</h1>
        <div className="searchFilter">
          <form onSubmit={searchButton}>
            <label>
              <input className="searchBar" placeholder="search" type="text" value={searchText} onChange={handleSearchTextChange} />
            </label>
            <input className="searchButton" type="submit" value="Search" />
          </form>
        </div>
      </div>

      <div className="rightSide">
        <button className="addReviewButton" onClick={handleClickAddReview}>Add Review</button>

        <div className="reviewShowing">
          {showAdd !== false ? <button className="goBack" onClick={handleCloseAdd}>Go back</button> : <p></p>}
          {showAdd === false ? <p className="showingText">showing: </p> : <p></p>}
          {showAdd === false ? <ReviewBlock className="reviewBlock" data={reviews} num={currentNum} setNum={setCurrentNum} caps={5}/> : <AddReview show={showAdd} id={props.id}/>}
          {showAdd === false ? <button className="showMore" onClick={() => { showMore();}} >show more</button> : <p></p>}
        </div>

      </div>

    </div>
  );
}

export default Reviews;