import React, {useState} from 'react';
const AnswerPhotos = ({photo}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const handlePhotoClick = (event) => {
    setShowPhoto(!showPhoto);
  }
  const answerPhotoModal = (
    <div onClick={handlePhotoClick}>
      <img src={photo.url}
      onClick={(event) => event.stopProgagation()}
      alt='photos'/>
    </div>
  );
  return (
    <div>
      <div>
        <img src={photo.url} className='a-photo' alt='photos'/>
        {showPhoto ? answerPhotoModal : null}
      </div>
    </div>
  )
}
export default AnswerPhotos;