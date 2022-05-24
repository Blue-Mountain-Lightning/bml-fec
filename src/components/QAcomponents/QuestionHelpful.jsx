import React, {useState} from 'react';
const QuestionHelpful = ({helpfulness, questionId}) => {
  const [helpfulQuestion, setHelpfulQuestion] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  let urlHelpful = `${process.env.REACT_APP_API}qa/questions/${questionId}/helpful`;
  const handleHelpfulQuestion = () => {
    if (!questionId) {
      return;
      }
    fetch (urlHelpful, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then(() => setHelpfulQuestion(true) )
      .catch(err => alert('Cannot change the helpfulness for this answer'))
  }

  let urlReport = `${process.env.REACT_APP_API}qa/questions/${questionId}/report`;
  const handleReport = () => {
    if (!questionId) {
      return;
    }
    fetch (urlReport, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then(() => setReportToggle(true) )
      .catch(err => alert('Cannot report this question'))
  }
    return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
            &nbsp;Helpful?&nbsp;
     {!helpfulQuestion ? <span onClick={() => handleHelpfulQuestion()}
       style ={{
        textDecoration: 'underline',
        cursor:'pointer'
        }} >&nbsp;Yes</span> : 'Yes'}
       ({helpfulQuestion? helpfulness + 1: helpfulness}) | &nbsp;
            </td>
            <td name = 'report'
          onClick={(event) => handleReport(event)}
          style ={{
            textDecoration: 'underline',
            cursor:'pointer'
          }}>
          {reportToggle ? 'Reported' : "Report"}
          </td>
          <td>&nbsp;|&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}
export default QuestionHelpful;