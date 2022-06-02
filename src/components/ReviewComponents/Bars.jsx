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

  console.log('mETA DATA', metaData);
  const getReviewByStar = (number) => {
    props.select(number);
  }


  const breakDown = (word) => {

    let total = '';
    for (let i = 0 ; i < 75; i++ ) {
      total = total + '|';
    }
    let progress = '';
    if (word === 'Size' && metaData.characteristics.Size) {
      for (let i = 0; i < metaData.characteristics.Size.value / 5 * 75; i++) {
        progress = progress + '|';
      }
    }

    if (word === 'Width' && metaData.characteristics.Width) {

      for (let i = 0; i < metaData.characteristics.Width.value / 5 * 75; i++) {
        progress = progress + '|';
      }
    }

    if (word === 'Quality' && metaData.characteristics.Quality) {

      for (let i = 0; i < metaData.characteristics.Quality.value / 5 * 75; i++) {
        progress = progress + '|';
      }
    }

    if (word === 'Comfort' && metaData.characteristics.Comfort) {
      for (let i = 0; i < metaData.characteristics.Comfort.value / 5 * 75; i++) {
        progress = progress + '|';
      }
    }

    if (word === 'Length' && metaData.characteristics.Length) {
      for (let i = 0; i < metaData.characteristics.Length.value / 5 * 75; i++) {
        progress = progress + '|';
      }
    }

    return (
      <div>

        <div >{word}
          <p className="progress1">{progress}</p>
          <p className="greybar">{total}</p>
        </div>

      </div>
    );
  }

  // {Object.keys(metaData.characteristics).forEach((key) => {
  //   console.log(metaData.characteristics[key].value);
  //   let temp2 = '';
  //   for (let i = 0 ; i < 50; i++ ) {
  //   temp2 = temp2 + '|';
  //   }

  //   let temp = '';
  //   for (let i = 0; i < metaData.characteristics.Size.value / 5 * 50; i++) {
  //     temp = temp + '|';
  //   }

  //   return (
  //     <div>
  //       {metaData.characteristics[key].value}
  //       {temp}
  //       {temp2}
  //     </div>
  //   );
  // })}
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
      <br></br><br></br>
      <div>
        <div>
          {breakDown('Size')}
        </div>
        <br></br><br></br>
        <div className="text1">1</div>
        <div className="text2">5</div>
        <br></br>

        <div>
          {breakDown('Width')}
        </div>
        <br></br><br></br>
        <div className="text1">1</div>
        <div className="text2">5</div>
        <br></br>

        <div>
          {breakDown('Comfort')}
        </div>
        <br></br><br></br>
        <div className="text1">1</div>
        <div className="text2">5</div>
        <br></br>

        <div>
          {breakDown('Quality')}
        </div>
        <br></br><br></br>
        <div className="text1">1</div>
        <div className="text2">5</div>
        <br></br>
        <div>
          {breakDown('Length')}
        </div>
        <br></br><br></br>
        <div className="text1">1</div>
        <div className="text2">5</div>

      </div>

    </div>


  );
}
export default Bars;