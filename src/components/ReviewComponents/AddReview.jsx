import './addReview.css';
import React, { useState, useEffect } from 'react';
import RadioButtons from './RadioButtons.jsx';
import { IconContext } from "react-icons";
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
//NEED TO WORK ON STARS
//maybe tune wordcount...
//upload photo function?
const AddReview = (props) => {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [recommend, setRecommend] = useState('');
  const [summary, setSummary] = useState('');
  const [fullReview, setFullReview] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [wordCount, setWordCount] = useState('');
  const [size, setSize] = useState(6);
  const [width, setWidth] = useState(6);
  const [comfort, setComfort] = useState(6);
  const [quality, setQuality] = useState(6);
  const [length, setLength] = useState(6);
  const [fit, setFit] = useState(6);
  const id1 = parseInt(props.id);


  const handleYesNo = (event) => {
    setRecommend(event.target.value);
  }

  const submitEverything = () => { //fetch post request using state as data.
    //need to check for validity, then executes the rests.
    if (fullReview.length < 50) {
      alert('not enough length');
      return;
    }

    //convert characteristics to the codes.








    //---------------------------------------------
    const allData = { //states.
      product_id: id1,
      rating: rating,
      summary: summary,
      body: fullReview,
      recommend: true,
      name: nickname,
      email: email,
      characteristics: { "135221": 3, "135219": 2, "135220": 5, "135222": 1 }
    }
    let url = `${process.env.REACT_APP_ENDPOINT}reviews`;
    //post request to api.
    console.log('test', JSON.stringify(allData));
    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': process.env.REACT_APP_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(allData)
    })
      .then(() => console.log('Success!'))
      .catch((err) => { alert(err) })
  }
  //testing conditional rendering, show form to add.
  return (
    <div className="page99">
      <div className="modal-content">

        <div className="top1">
          <b className="title">Write Your Review</b>
          <button onClick={props.set} className="close">close</button>
        </div>
        <div className="star-rating">

          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button type="button" key={index}

                className={index <= (hover || rating) ? "on" : "off"}
                onClick={() => { setRating(index); }}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}>

                <span className="star">&#9733;</span>

              </button>
            );
          })}
          {rating === 1 ? <p className="oneStarSelected">Poor</p> : rating === 2 ? <p className="twoStarSelected">Fair</p> : rating === 3 ? <p className="threeStarSelected">Average</p> : rating === 4 ? <p className="fourStarSelected">Good</p> : rating === 5 ? <p className="fiveStarSelected">Great</p> : <i className="none">none</i>}
        </div>
        <div className="input">
          <br></br>
          <b className="text1" onChange={handleYesNo}> Do you recommend this product?
            <br></br>
            <input className="rb1" type="radio" value="yes" /> Yes  &nbsp;
            <input className="rb2" type="radio" value="no" /> No
          </b>

          <b className="charText"> Characteristics: </b><br></br>
          <div className='buttons00'>
            Size:<br></br>
            <RadioButtons setNum={setSize} />
            <br></br>
            Width:<br></br>
            <RadioButtons setNum={setWidth} />
            <br></br>
            Comfort:<br></br>
            <RadioButtons setNum={setComfort} />
            <br></br>
            Quality:<br></br>
            <RadioButtons setNum={setQuality} />
            <br></br>
            Length:<br></br>
            <RadioButtons setNum={setLength} />
            <br></br>
            Fit:<br></br>
            <RadioButtons setNum={setFit} />
            <br></br>
          </div>

          <br></br>
          <label>
            <b className="reviewSumm">Review summary</b><br></br><br></br>
            <textarea className="addReviewSummary" placeholder=" Example: Best purchase ever!" rows="3" cols="70" name="summary" type="text" value={summary} onChange={(e) => {
              setSummary(e.target.value);
            }} /><br></br>
          </label>
          <br></br>

          <label>
            <b>Why did you like the product or not?</b>
            <br></br>
            <br></br>
            <textarea className="addFullReview" placeholder=" full review" rows="15" cols="100" name="review" type="text" value={fullReview} onChange={(e) => {
              setFullReview(e.target.value);
              setWordCount(fullReview.length);
            }} />
            <p>Minimum required characters left: {50 - wordCount >= 0 ? 50 - wordCount : 0} </p>

          </label>
          <br></br>
          <b>Nickname: </b><br></br>
          <textarea className="nickname" type="text" placeholder=" Example: jackson11!" cols="30" onChange={(e) => {
            setNickname(e.target.value);
          }} /><br></br>
          For privacy reasons, do not use your full name or email address” will appear.
          <br></br>
          <br></br>
          <b>Email: </b><br></br>
          <textarea className="email" type="text" placeholder=" Example: jackson11@email.com" cols="50" onChange={(e) => {
            setEmail(e.target.value);
          }} /><br></br>
          For authentication reasons, you will not be emailed
          <br></br>
          <br></br>
          <button className="submitAdd" onClick={submitEverything}>Submit</button>
        </div>
      </div>

    </div>
  );

}
export default AddReview;