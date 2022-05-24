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
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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
    <div onClick={(event => handleSelect(event))}>
      <div onClick={(event => event.stopPropagation())}>
      <h3>Ask Your Question</h3>
        <h4>About the {product.name} Here </h4>
      <span
          onClick={event => handleSelect(event)}
        >&times;</span>
        <form onSubmit={handleSubmit}>
          <label>Your Question*
            <input name ='questionAsk'
              placeholder='Ask your question here...'
              type='text'
              value={add.questionAsk}
              maxLength='1000'
              onChange={handleOnChange}/>
          </label>
          <label>What is your nickname*
            <input name ='nickname'
              placeholder='Examples: jackson11!'
              type ='text'
              value={add.nickname}
              maxLength='60'
              onChange={handleOnChange}/>
            </label>
            <p>For privacy reasons, do not use your full name or email address</p>
            <label>Your email*
              <input name ='email'
                type='text'
                value={add.email}
                maxLength='60'
                placeholder='Why did you like the product or not?'
                onChange={handleOnChange}/>
            </label>
            <p>For authentication reasons, you will not be emailed</p>
            <input type='submit' value='Submit question'/>
        </form>
      </div>
    </div>
  )
  return (
    <div>
      {openAdd? QuestionForm : null}
    </div>
  )
}
export default AddQuestion;