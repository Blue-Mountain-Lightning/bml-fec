import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import QuestionList from './QuestionList.jsx';
 import AddQuestion from './AddQuestion.jsx';

const QuestionsAndAnswers = ({productId, product}) => {
  const [questions, setQuestions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  let url = `${process.env.REACT_APP_API}qa/questions?product_id=${productId}&count=40`

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
    <div>
     {questions.length > 0 && <Search handleSearch={handleSearch} searchInput={searchInput}/> }
      {questions.length !== 0 ?
      <QuestionList searchInput={searchInput} questions={questions} product={product}/>
    : null}
    <button onClick={handleOpen}>ADD A QUESTION +</button>
   <AddQuestion handleClose={handleClose} openAdd={openAdd} productId={productId} product={product}/>
    </div>
  )
}
export default QuestionsAndAnswers;