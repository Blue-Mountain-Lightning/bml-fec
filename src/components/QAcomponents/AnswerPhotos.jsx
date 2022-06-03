import React, {useState} from 'react';
const AnswerPhotos = ({photo}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const handlePhotoClick = (event) => {
    setShowPhoto(!showPhoto);
  }
  const answerPhotoModal = (
    <div className='answer-photo-modal'>
      <img className='enlarged-answer-photo'
      src={photo.url}
      onClick={handlePhotoClick}
      alt='photos'/>
      <button className='enlarged-photo-close'
      onClick={handlePhotoClick}>
      X
      </button>
    </div>
  );
  return (
    <>
      <div className='photo-div'>
        <img src={photo.url} className='answer-photo' alt='photos' onClick={handlePhotoClick}/>
        {showPhoto ? answerPhotoModal : null}
      </div>
    </>
  )
}
export default AnswerPhotos;