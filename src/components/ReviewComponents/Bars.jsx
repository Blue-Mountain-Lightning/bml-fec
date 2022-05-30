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
  if (!metaData) {
    return;
  }
  let one = 0;
  if (metaData.ratings[1] === undefined) {
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
  const total = one + two + three + four + five;


  console.log('title', one);
  let bar1 = '';
  for (let i = 0; i < one; i++) {
    bar1 = bar1 + '|';
  }
  let bar11 = total - one;
  let space1 = '';
  for (let i = 0; i < bar11; i++) {
    space1 = space1 + '|';
  }

  let bar2 = '';
  for (let i = 0; i < two; i++) {
    bar2 = bar2 + '|';
  }
  let bar21 = total - two;
  let space2 = '';
  for (let i = 0; i < bar21; i++) {
    space2 = space2 + '|';
  }


  let bar3 = '';
  for (let i = 0; i < three; i++) {
    bar3 = bar3 + '|';
  }
  let bar31 = total - three;
  let space3 = '';
  for (let i = 0; i < bar31; i++) {
    space3 = space3 + '|';
  }


  let bar4 = '';
  for (let i = 0; i < four; i++) {
    bar4 = bar4 + '|';
  }
  let bar41 = total - four;
  let space4 = '';
  for (let i = 0; i < bar41; i++) {
    space4 = space4 + '|';
  }

  let bar5 = '';
  for (let i = 0; i < five; i++) {
    bar5 = bar5 + '|';
  }
  let bar51 = total - five;
  let space5 = '';
  for (let i = 0; i < bar51; i++) {
    space5 = space5 + '|';
  }


  const bars = (barNum) => { //seems to fill the whole div...
    let bar = '';
    for (let i = 0; i < barNum; i++) {
      bar = bar + '|';
    }
    return (
      <p className = "bar">{bar}</p>
    );
  }

  //--------------------------------
  return (
    <div >
      <div className="graphs">
        <p>1 star: &nbsp;</p>
        <p className="bar">{bar1}</p>
        <p className="greystuff">{space1}</p>
        <p>&nbsp;&nbsp;{one}</p>
      </div>
      <div className="graphs">
        <p>2 star: &nbsp;</p>
        <p className="bar">{bar2}</p>
        <p className="greystuff">{space2}</p>
        <p>&nbsp;&nbsp;{two}</p>
      </div>
      <div className="graphs">
        <p>3 star: &nbsp;</p>
        <p className="bar">{bar3}</p>
        <p className="greystuff">{space3}</p>
        <p>&nbsp;&nbsp;{three}</p>
      </div>
      <div className="graphs">
        <p>4 star: &nbsp;</p>
        <p className="bar">{bar4}</p>
        <p className="greystuff">{space4}</p>
        <p>&nbsp;&nbsp;{four}</p>
      </div>
      <div className="graphs">
        <p>3 star: &nbsp;</p>
        <p className="bar">{bar5}</p>
        <p className="greystuff">{space5}</p>
        <p>&nbsp;&nbsp;{five}</p>
      </div>

    </div>
  );
}
export default Bars;