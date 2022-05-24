import React, {useEffect, useState} from 'react';
import AnswerEntry from './AnswerEntry.jsx';
import MoreAnswers from './MoreAnswers.jsx';
const AnswerList = ({questionId}) => {
  const [answers, setAnswers] = useState([])
  let url = `${process.env.REACT_APP_API}qa/questions/${questionId}/answers`;
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
      {answers.slice(0, 3).map((answer, i) => {
        if (i > 1) {
          return <MoreAnswers answers ={answers} key ={i} />
        }
        return  <AnswerEntry answer ={answer} key ={i} answerId={answer.answer_id}/>
      })}
    </div>

  )
}
}
export default AnswerList;