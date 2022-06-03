import React, {useEffect, useState} from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import MoreAnswers from './MoreAnswers.jsx';
const AnswerList = ({questionId, product}) => {
  const [answers, setAnswers] = useState([])
  let url = `${process.env.REACT_APP_ENDPOINT}qa/questions/${questionId}/answers?count=100`;
  useEffect(() => {
    if (!questionId) {
      return;
    }
    fetch(url, { headers: { 'Authorization': process.env.REACT_APP_TOKEN },
    contentType: 'application/json'
   })
      .then(response => response.json())
      .then(data => {
        setAnswers(data.results.sort((a, b) => a.helpfulness - b.helpfullness));
      })
  }, [url, questionId])
if (!answers) {
    return;
  } else {
  return (
    <div>
      {answers.slice(0, 3).map((answer, i) => (
        i > 1
        ? <MoreAnswers answers ={answers} key ={i} />

        : <AnswerEntry answer ={answer} key ={i} answerId={answer.answer_id}/>
      ))}
    </div>
  )
}
}
export default AnswerList;