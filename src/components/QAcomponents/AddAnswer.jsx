import React, {useState} from 'react';
import axios from 'axios';
const AddAnswer = ({productId, product, questionId, questionBody}) => {
  const [addAnswerModal, setAddAnswerModal] = useState(false);
  const [images, setImages] = useState([]);
  const [addAnswer, setAddAnswer] = useState({
    answerAdd: '',
    nickname: '',
    email:'',
  });
  const handleClose= (event) => {
    event.stopPropagation();
    setAddAnswerModal(false);
  }
  const handleOnChange = (event) => {
     const {name, value} = event.target;
     setAddAnswer(prevValue => {
       return {
         ...prevValue,
         [name]: value
       }
     });
  }
  const handleAddImages = (event) => {
    uploadImage(event.target.files);
    setImages([]);
  }
  const validatedEmail = (emailAddress) => {
    let regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }
  let url = `${process.env.REACT_APP_ENDPOINT}qa/questions/${questionId}/answers`;
  let data = {
    body: addAnswer.answerAdd,
    name: addAnswer.nickname,
    email: addAnswer.email,
    photos: images,
  }
  const handleAddAnswer =(event) => {
     event.preventDefault();
    if ( validatedEmail(addAnswer.email) && addAnswer.nickname.length && addAnswer.answerAdd.length) {
      fetch (url, {
        method: 'POST',
        headers: {'Authorization': process.env.REACT_APP_TOKEN,
        'Content-Type': 'application/json',},
        body: JSON.stringify(data)
        })
        .then(() => console.log('You posted an answer'))
        .catch(err => alert('Cannot post the answer'))
    } else {
      alert('You must enter the following: ')
    }
    setAddAnswerModal(false);
  }
  const uploadImage = (files) => {
      for (let i = 0; i < files.length; i++) {
        const currentPhoto = files[i];
        const formData = new FormData();
        formData.append('file', currentPhoto);
        formData.append('upload_preset', 'jcpzcsuy');
        axios.post('https://api.cloudinary.com/v1_1/dvfhaf9bb/image/upload', formData)
          .then((response) => {
            setImages([...images, response.data.url]);
          })
     }

  }
  const AnswerForm = (
    <div className ='answer-form-popup' onClick={(event => handleClose(event))}>
      <div className='answer-form-container ' onClick={(event => event.stopPropagation())}>
        <div className='answer-header'>
        <h2 >Submit your Answer</h2>
        <br/>
        <h3 >{product && product.name} : {questionBody}</h3>
        <button className='answer-modal-close-x'
          onClick={event => {handleClose(event); setImages([])}  }
        >X</button>
        </div>
        <form className='answer-form'
          onSubmit={handleAddAnswer} >
           <label className='modal-label'>Your eamil *
           <br/>
              <input className='answer-email'
                name ='email'
                type='email'
                value={addAnswer.email}
                maxLength='60'
                placeholder='Example: jack@email.com'
                onChange={handleOnChange}/>
            </label>
            <span className='qa-fyi'>For authentication reasons, you will not be emailed</span>
            <label className='modal-label'>What is your nickname *
            <br/>
              <input className='answer-name'
                name ='nickname'
                placeholder='Example: jack543!'
                type ='text'
                value={addAnswer.nickname}
                maxLength='60'
                onChange={handleOnChange}/>
            </label>
            <span className='qa-fyi'>For privacy reasons, do not use your full name or email address</span>
           <label className='modal-label'>Your Answer *
           <br/>
            <textarea className='add-answer-body '
              name ='answerAdd'
              placeholder='Add your answer here...'
              type='text'
              maxLength='1000'
              value={addAnswer.answerAdd}
              onChange={handleOnChange} required/>
          </label>
          <label className='upload-photo-modal-label'> Upload Your Photos:
          <br/>
          {images.length < 5 &&
          <input className='add-answer-choose-file'
              name ='images'
              type='file'
              accept='image/*'
              placeholder='images...'
              onChange={handleAddImages}/>}
           </label>
           {images.length !== 0 && (<div>
           {images.map((image, index) => (<img className='upload-image' src={image} alt='preview' key={index}/>))}
           </div>)}
            <div className='add-answer-footer'>
              <input className='submit-answer-button' type='submit' value='Submit answer'/>
            </div>
        </form>
      </div>
    </div>
  );
  return (
    <div >
      <div onClick={() => setAddAnswerModal(true)}
      className='qa-underline'>
        Add Answer
      </div>
      <div> {addAnswerModal ? AnswerForm : null}</div>
    </div>
  )

}
export default AddAnswer;