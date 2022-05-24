import React, {useState} from 'react';
const AnswerHelpful = ({answerHelpfulness, answerId}) => {
  const [helpfulAnswer, setHelpfulAnswer] = useState(false);
  const [reportToggle, setReportToggle] = useState(false);

  let urlHelpful = `${process.env.REACT_APP_API}qa/answers/${answerId}/helpful`;
  const handleHelpfulAnswers = () => {
    if (!answerId) {
      return;
      }
    fetch (urlHelpful, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      body: parseInt(answerId)
      })
      .then(() => setHelpfulAnswer(true) )
      .catch(err => alert('Cannot change the helpfulness for this answer'))
  }
  let urlReport = `${process.env.REACT_APP_API}qa/answers/${answerId}/report`;
  const handleReport = () => {
    if (!answerId) {
      return;
    }
    fetch (urlReport, {
      method: 'PUT',
      headers: {'Authorization': process.env.REACT_APP_TOKEN},
      })
      .then((data) => {
        setReportToggle(true)
        })
      .catch(err => alert('Cannot report this question'))
  }
    return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              &nbsp;Helpful?&nbsp;
              {!helpfulAnswer ? <span onClick={() => handleHelpfulAnswers()}
                style ={{
                  textDecoration: 'underline',
                  cursor:'pointer'
                  }} >&nbsp;Yes</span> : 'Yes'}
                 ({helpfulAnswer? answerHelpfulness + 1: answerHelpfulness}) | &nbsp;
            </td>
            <td name = 'report'
              onClick={(event) => handleReport(event)}
              style ={{
              textDecoration: 'underline',
              cursor:'pointer'
              }}>
             {reportToggle ? 'Reported' : "Report"}
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  )

}
export default AnswerHelpful;