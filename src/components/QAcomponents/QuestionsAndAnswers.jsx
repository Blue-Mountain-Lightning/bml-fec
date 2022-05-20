import React from 'react';
import qaData from '../../examples/questionsAndAnswers.js';
import AnswerList from './AnswerList.jsx';
import Search from './Search.jsx';
import MoreQuestions from './MoreQuestions.jsx';
// console.log(qaData.questions.results[0].question_body);
// console.log(qaData.questions.results[0].answers[5539005].date);
const QuestionsAndAnswers = () => {
  return (
    <div>
      <Search />
    <b>Q: {qaData.questions.results[0].question_body}</b>
    <AnswerList answers={qaData.questions.results[0].answers}/>
    <MoreQuestions />
    </div>
  )
}
export default QuestionsAndAnswers;