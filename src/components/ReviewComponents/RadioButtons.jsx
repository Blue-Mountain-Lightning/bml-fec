import React, { useState, useEffect } from 'react';
import './addReview.css';
const RadioButtons = (props) => {
  const [active, setActive] = useState(6);



  return (
    <label className="rb0">
    <input className="rb5" type="radio" value="1" checked={active === 1} onChange={()=> {setActive(1); props.setNum(1)}}/> 1 &nbsp;
    <input className="rb6" type="radio" value="2" checked={active === 2} onChange={()=> {setActive(2); props.setNum(2)}}/> 2 &nbsp;
    <input className="rb7" type="radio" value="3" checked={active === 3} onChange={()=> {setActive(3); props.setNum(3)}}/> 3&nbsp;
    <input className="rb8" type="radio" value="4" checked={active === 4} onChange={()=> {setActive(4); props.setNum(4)}}/> 4&nbsp;
    <input className="rb9" type="radio" value="5" checked={active === 5} onChange={()=> {setActive(5); props.setNum(5)}}/> 5&nbsp;
  </label>
  );
}
export default RadioButtons;