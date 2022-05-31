import React, {useState} from 'react';
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
    const photos =[];
    photos.push(event.target.value);
    setImages(photos);
  }
  const validatedEmail = (emailAddress) => {
    let regexEmail = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }
  let url = `${process.env.REACT_APP_API}qa/questions/${questionId}/answers`;
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
  const AnswerForm = (
    <div className ='answer-form-popup' onClick={(event => handleClose(event))}>
      <div className='answer-form-container ' onClick={(event => event.stopPropagation())}>
        <div className='answer-header'>
        <h3 >Submit your Answer</h3>
        <h4 >{product && product.name} : {questionBody}</h4>
        <button className='answer-modal-close-x'
          onClick={event => handleClose(event)}
        >X</button>
        </div>
        <form className='answer-form'
          onSubmit={handleAddAnswer} >
           <label className='modal-label'>Your eamil*
              <input className='answer-email'
                name ='email'
                type='text'
                value={addAnswer.email}
                maxLength='60'
                placeholder='Example: jack@email.com'
                onChange={handleOnChange}/>
            </label>
            <p>For authentication reasons, you will not be emailed</p>
            <label className='modal-label'>What is your nickname*
              <input className='answer-name'
                name ='nickname'
                placeholder='Example: jack543!'
                type ='text'
                value={addAnswer.nickname}
                maxLength='60'
                onChange={handleOnChange}/>
            </label>
            <p>For privacy reasons, do not use your full name or email address</p>
           <label className='modal-label'>Your Answer*
            <input className='answer-body'
              name ='answerAdd'
              placeholder='Add your answer here...'
              type='text'
              maxLength='1000'
              value={addAnswer.answerAdd}
              onChange={handleOnChange}/>
          </label>
          <div className='modal-label'>
            {images.length < 5 ? <input name ='images'
              type='file'
              accept='image/*'
              value={images}
              placeholder='images...'
              onChange={handleAddImages}/> : null}
           </div>
            <div className='align-right'>
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