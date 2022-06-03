import React, {useState} from 'react';
const AddQuestion = ({handleClose, productId, product, openAdd }) => {
  const [add, setAdd] = useState({
    questionAsk: '',
    nickname: '',
    email:''
  });
  const handleSelect = (event) => {
    event.stopPropagation();
    handleClose();
  }
  const handleOnChange = (event) => {
     const {name, value} = event.target;
     setAdd(prevValue => {
       return {
         ...prevValue,
         [name]: value
       }
     });
  }
  const validatedEmail = (emailAddress) => {
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAddress.match(regexEmail)) {
      return true;
    } else {
      return false;
    }
  }
  let url = `${process.env.REACT_APP_API}qa/questions`;
  let data = {
    body: add.questionAsk,
    name: add.nickname,
    email: add.email,
    product_id: parseInt(productId)
  }
  const handleSubmit =(event) => {
    event.preventDefault();
    if ( validatedEmail(add.email) && add.nickname.length && add.questionAsk.length ) {
      fetch (url, {
        method: 'POST',
        headers: {'Authorization': process.env.REACT_APP_TOKEN,
        'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        })
        .then(() => console.log('You posted a question'))
        .catch(err => alert('Cannot post the question'))
    } else {
      alert('You must enter the following: ')
    }
    handleClose();
  }
  const QuestionForm = (
    <div className='question-form-popup'
      onClick={(event => handleSelect(event))}>
      <div className='question-form-container'
        onClick={(event => event.stopPropagation())}>
          <div className='answer-header'>
           {product?
           <>
           <h3>Ask Your Question</h3>
            <h4>About the {product.name} Here </h4>
            </> : null}
            <button className='question-modal-close-x'
                onClick={event => handleSelect(event)}
            >x</button>
          </div>
        <form className='question-form'
          onSubmit={handleSubmit}>
          <label className='modal-label'>Your email *
              <input className='question-email'
                name ='email'
                type='email'
                value={add.email}
                maxLength='60'
                placeholder='Why did you like the product or not?'
                onChange={handleOnChange}/>
            </label>
            <span className='qa-fyi'>For authentication reasons, you will not be emailed</span>
            <label className='modal-label'>What is your nickname *
            <input className='question-name'
              name ='nickname'
              placeholder='Examples: jackson11!'
              type ='text'
              value={add.nickname}
              maxLength='60'
              onChange={handleOnChange}/>
            </label>
            <span className='qa-fyi'>For privacy reasons, do not use your full name or email address</span>
           <label className='modal-label'>Your Question *
           <br/>
             <textarea className='question-textarea'
              name ='questionAsk'
              placeholder='Ask your question here...'
              type='text'
              value={add.questionAsk}
              maxLength='1000'
              onChange={handleOnChange}/>
           </label>
           <div className='add-questin-button-wrapper'>
            <input className='submit-question-button' type='submit' value='Submit question'/>
            </div>
        </form>
      </div>
    </div>
  )
  return (
    <>
      {openAdd? QuestionForm : null}
    </>
  )
}
export default AddQuestion;