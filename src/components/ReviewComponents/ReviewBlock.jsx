import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';
import './Review1.css';

const ReviewBlock = (props) => {
  const [display, setDisplay] = useState('');
  const [searchText, setSearch] = useState('');
  const [class1, setClass1] = useState('searchBar');

  if (props.data === undefined) {
    return;
  }

  const handleSearchTextChange = (event) => {
    event.preventDefault();

    setSearch(event.target.value);
  }

  let arr = props.data.results.slice();

  const searchButton = () => {
    if (searchText === '') {
      setClass1('invalid');
      return;
    } else {
      setClass1('searchBar');
    }

    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].summary.includes(searchText)) {
        temp.push(arr[i]);
      } else if (arr[i].body.includes(searchText)) {
        temp.push(arr[i]);
      }
    } //pass result to using props.
    setDisplay(temp.slice());
  }

  const newArr = props.data.results.slice(0, props.num);
  return (
    <div >
      <div className="searchFunction">
          <input className={class1} placeholder="   search" type="text" value={searchText} onChange={handleSearchTextChange} />
          <button className="searchButton" type="submit" value="Search" onClick={searchButton}>Search</button>
      </div>
      <p className="showingText">showing: </p>
      <div className="reviewBlock">
        { display === '' ?
          newArr.map((review) => {
            return (
              <OneReview key={review.review_id} className="eachReview" data={review}/>
            );
          }) :
          display.map((review) => {
            return (
              <OneReview key={review.review_id} className="eachReview" data={review}/>
            );

          })
        }
      </div>
    </div>


  );
};

export default ReviewBlock;