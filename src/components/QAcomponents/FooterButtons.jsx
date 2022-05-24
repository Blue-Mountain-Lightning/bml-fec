import React from 'react';
import AddQuestion from './AddQuestion.jsx';
import MoreQuestions from './MoreQuestions.jsx';
const FooterButtons =({questions, handleOpen, handleClose, openAdd, productId, product}) => {
  if (questions.length < 2 ) {
    return (
    <div>
      <button onClick={handleOpen}>ADD A QUESTION +</button>
    <AddQuestion handleClose={handleClose} openAdd={openAdd} productId={productId} product={product}/>
    </div>
    )
  } else {
    return (
      <div>
        <MoreQuestions questions={questions}/>
        <button onClick={handleOpen}>ADD A QUESTION +</button>
        <AddQuestion handleClose={handleClose} openAdd={openAdd} productId={productId} product={product}/>
      </div>
    )
  }


}
export default FooterButtons;