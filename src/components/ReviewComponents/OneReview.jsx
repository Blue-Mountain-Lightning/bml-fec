import React, { useState, useEffect } from 'react';
import Stars from './Stars.jsx';
import {FcLikePlaceholder, FcLike} from 'react-icons/fc';
import { AiOutlineCheck } from "react-icons/ai";
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import moment from 'moment';
import { MdThumbDown, MdThumbUp, MdOutlineThumbDownAlt, MdOutlineThumbUpAlt} from "react-icons/md";
import { IconContext } from "react-icons";
import Photos from './Photos.jsx';

const OneReview = (props) => {
  const [fullReview, setFullReview] = useState('');
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [num, setNum] = useState(props.data.helpfulness);
  const {notHelpfulNum, setNotHelpfulNum} = useState(0);

  useEffect(() => {
    setFullReview(props.data.body);
  }, [props.data.body])


  const helpful = () => {
    if (liked === true) {
      setNum(num - 1);
      setLiked(!liked);
      return;
    }
    setLiked(!liked);
    //post request with yes/no.
    if (disliked) {
      setDisliked(false);
    }

    let url = `${process.env.REACT_APP_ENDPOINT}reviews/${props.data.review_id}/helpful`;

    if (!props.data.review_id) {
      return;
    }
    fetch (url, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      body: parseInt(props.data.review_id)
      })
    .then(() => setLiked(!liked))
    .then(() => setNum(num+ 1))
    .catch(err => alert('Cannot change the helpfulness for this answer'))
  }

  const notHelpful = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
    //setNotHelpfulNum(notHelpfulNum + 1);
  }

  return (

    <div className="eachReview">

      <div className="reviewRatings">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <div key={index}>
              <IconContext.Provider value={{ color: "grey", className: "global-class-name" }}>
                {index <= props.data.rating ? <ImStarFull /> : <ImStarEmpty />}
              </IconContext.Provider>
            </div>
          );
        })}
      </div>

      <div className="date">
            {`${moment.utc(props.data.date).format('MMMM D, YYYY')}`}
      </div>

      <div>
        <b className="summ">{props.data.summary}</b>
        <p className="full">{fullReview}</p>
      </div>

      <Photos arr={props.data.photos}/>

      <div>
        {props.data.recommend === true ? <div>I recommend this product &nbsp;<AiOutlineCheck /></div>: <p></p>}
        <p className="reviewer">Reviewed 111by: {props.data.reviewer_name} </p>
      </div>

      <div>

        {props.data.response !== null ? <p>seller response: {props.data.response}</p> : <p></p>}
      </div>

      <div>
        <p>

          Was this review Helpful? &nbsp; &nbsp;
          {!liked ? <MdOutlineThumbUpAlt onClick={helpful} /> : <MdThumbUp onClick={helpful}/>}
          &nbsp;({num})
          &nbsp; &nbsp;
          {!disliked ? <MdOutlineThumbDownAlt onClick={notHelpful} /> : <MdThumbDown onClick={notHelpful} />}
          &nbsp; (0{notHelpfulNum})
        </p>
      </div>
    </div>
  );
}
export default OneReview;

//like button
// {liked ? <FcLike className="unlikeButton" onClick={likeIt} /> : <FcLikePlaceholder className="likeButton" onClick={likeIt}/>} &nbsp;