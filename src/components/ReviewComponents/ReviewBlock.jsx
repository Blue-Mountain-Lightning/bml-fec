import React, { useState, useEffect } from 'react';
import OneReview from './OneReview.jsx';
import './Review1.css';

const ReviewBlock = (props) => {
  const [display, setDisplay] = useState('');
  const [searchText, setSearch] = useState('');
  const [class1, setClass1] = useState('searchBar');
  const [reviews, setReviews] = useState(undefined);

  const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}&count=50`

  useEffect(() => {
    if (reviews === undefined) {
      const fetchReviews = async () => {
        if (props.id) {
          try {
            let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
            const response = await fetch(url, headers);
            const reviews99 = await response.json();
            setReviews(reviews99);
          } catch (err) {
            console.log(err);
          }
        }
      }
      fetchReviews();
    }
  }, [props.id, url]);

  const handleSearchTextChange = (event) => {
    event.preventDefault();
    setSearch(event.target.value);


  }

  let arr = props.data.results.slice();

  const searchButton = () => {

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

  const getSorted = (event) => {

    if (event.target.value === 'newest') {
      const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}&sort=newest&count=500`
      const fetchReviews = async () => {
        if (props.id) {
          try {
            let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
            const response = await fetch(url, headers);
            const reviews99 = await response.json();
            setReviews(reviews99);
          } catch (err) {
            console.log(err);
          }
        }
      }
      fetchReviews();
    }

    if(event.target.value === 'helpful') {
      const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}&sort=helpful&count=50`
      const fetchReviews = async () => {
        if (props.id) {
          try {
            let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
            const response = await fetch(url, headers);
            const reviews99 = await response.json();
            setReviews(reviews99);
          } catch (err) {
            console.log(err);
          }
        }
      }
      fetchReviews();
    }

    if(event.target.value === 'relevant') {
      const url = `${process.env.REACT_APP_API}reviews/?product_id=${props.id}&sort=relevant&count=50`
      const fetchReviews = async () => {
        if (props.id) {
          try {
            let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
            const response = await fetch(url, headers);
            const reviews99 = await response.json();
            setReviews(reviews99);
          } catch (err) {
            console.log(err);
          }
        }
      }
      fetchReviews();
    }
  }


  if (reviews === undefined) {
    return;
  }

  let newArr = reviews.results.slice(0, props.num);

  if (props.select !== 0) {
    newArr = [];
    for (let i = 0; i < reviews.results.length; i++) {
      if (reviews.results[i].rating === props.select) {
        newArr.push(reviews.results[i]);
      }
    }
    console.log(newArr);
  }
  return (
    <div >
      <div>
        <form className="sortBy">
          <label>
            <select onChange={getSorted} >
            <option value="none">Sort by</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
            <option value="relevant">Relevant</option>
          </select>
        </label>
      </form>
    </div>

    <div className="searchFunction">
      <input className={class1} placeholder="   search" type="text" value={searchText} onChange={(e) => {
        handleSearchTextChange(e); searchButton();}} />
    </div>

    <p className="showingText">showing: {newArr.length}</p>
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