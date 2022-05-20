import React, {useState} from 'react';
const AnswerPhotos = (props) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const handlePhotoClick = (event) => {
    setShowPhoto(!showPhoto);
  }
  const answerPhotoModal = (
    <div onClick={handlePhotoClick}>
      <img src={props.photo}
      onClick={(event) => event.stopProgagation()}
      alt='photos'/>
    </div>
  );
  return (
    <div>
      <div>
        <img src={props.photo} alt='photos'/>
        {showPhoto ? answerPhotoModal : null}
      </div>
    </div>
  )
}
export default AnswerPhotos;