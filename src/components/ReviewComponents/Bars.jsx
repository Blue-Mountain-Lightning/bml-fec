import React, { useState, useEffect } from 'react';
import './Bars.css';
const Bars = (props) => {

  const [metaData, setmedtaData] = useState('');

  useEffect(() => {
    if (props.id === undefined) {
      return;
    }
    const asdf = `${process.env.REACT_APP_API}reviews/meta/?product_id=${props.id}`
    const fetchReviews = async () => {
    if (props.id) {
      try {
        let headers = { headers: { 'Authorization': process.env.REACT_APP_TOKEN } }
        const response = await fetch(asdf, headers);
        const reviews99 = await response.json();
        setmedtaData(reviews99);
      } catch (err) {
        console.log(err);
      }
    }
    }
    fetchReviews();
  }, [props.id]);

  //bar graph.
  if (!metaData) {
    return;
  }
  let one = 0;
  if (!metaData.ratings.hasOwnProperty('1')) {
    one = 0;
  } else {
    one = parseInt(metaData.ratings[1]);
  }
  let two = 0;
  if (metaData.ratings[2] === undefined) {
    two = 0;
  } else {
    two = parseInt(metaData.ratings[2]);
  }
  let three = 0;
  if (metaData.ratings[3] === undefined) {
    three = 0;
  } else {
    three = parseInt(metaData.ratings[3]);
  }
  let four = 0;
  if (metaData.ratings[4] === undefined) {
    four = 0;
  } else {
    four = parseInt(metaData.ratings[4]);
  }
  let five = 0;
  if (metaData.ratings[5] === undefined) {
    five = 0;
  } else {
    five = parseInt(metaData.ratings[5]);
  }

  const total = 0 + one + two + three + four + five;
  const superTotal = 50;


  const bars = (bar) => { //seems to fill the whole div...

    let num = bar;
    if (metaData.ratings[num] === undefined) {
      num = 0;
    } else {
      num = parseInt(metaData.ratings[num]);
    }
    let barL = '';
    num = num / total * superTotal;
    num = Math.round(num);
    for (let i = 0; i < num; i++) {
      barL = barL + '|'; //green part.
    }
    let spaceNum = superTotal - num;
    let space = ''; //space, the grey part.
    for (let i = 0; i < spaceNum; i++) {
      space = space + '|';
    }

    return (
      <div className="graphs">
        <p className="starText">{bar} star: &nbsp;</p>
        <p className="bar">{barL}</p>
        <p className="greystuff">{space}</p>
        <p>&nbsp;&nbsp;{num}</p>
      </div>
    );
  }


  const getReviewByStar = (number) => {
    props.select(number);
  }

  //--------------------------------
  return (
    <div >
      <div onClick={() => {getReviewByStar(1)}} >
        {bars(1)}
      </div>
      <div onClick={() => {getReviewByStar(2)}}>
        {bars(2)}
      </div>
      <div onClick={() => {getReviewByStar(3)}}>
        {bars(3)}
      </div>
      <div onClick={() => {getReviewByStar(4)}}>
        {bars(4)}
      </div>
      <div onClick={() => {getReviewByStar(5)}}>
        {bars(5)}
      </div>
    </div>


  );
}
export default Bars;