import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
import AddQuestion from './AddQuestion.jsx'
const QuestionsAndAnswers = ({productId, product}) => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  let url = `${process.env.REACT_APP_ENDPOINT}qa/questions?product_id=${productId}&count=100`
console.log(`${process.env.BASE_URL}`);
  useEffect(() => {
    fetch(url, { headers: { 'Authorization': process.env.REACT_APP_TOKEN } })
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results.sort((a, b) => a.helpfulness - b.helpfullness));
      })
  }, [url, productId])

  const handleSearch = (searchInput) => {
    searchInput.length > 2
      ? setSearchInput(searchInput)
      : setSearchInput('')
  };
  const handleOpen = () => setOpenAdd(true);
  const handleClose = () => setOpenAdd(false);
  if (!questions) {
    return;
  }
  return (
    <div className='qa-container'>
    <div className='qa-padding'>
     <h2>Questions and Answers</h2>
     {questions.length > 0 && <Search handleSearch={handleSearch} searchInput={searchInput}/> }
    <div>
      {(questions.length === 0 || questions.length <=4) ?
      <>
       <button className='add-a-question-button' onClick= {handleOpen}>ADD A QUESTION +</button>
      <AddQuestion handleClose={handleClose} openAdd={openAdd} productId={productId} product={product}/>
      </> :
      <QuestionList searchInput={searchInput} questions= {questions} product= {product}  handleClose={handleClose} openAdd={openAdd} productId={productId} handleOpen ={handleOpen}/>
     }
     </div>
    </div>
  </div>
  )
}
export default QuestionsAndAnswers;