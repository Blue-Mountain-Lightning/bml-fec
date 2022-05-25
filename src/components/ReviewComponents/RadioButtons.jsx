import React, { useState, useEffect } from 'react';
const RadioButtons = (props) => {
  const [active, setActive] = useState(6);



  return (
    <label>
    <input type="radio" value="1" checked={active === 1} onChange={()=> {setActive(1); props.setNum(1)}}/> 1
    <input type="radio" value="2" checked={active === 2} onChange={()=> {setActive(2); props.setNum(2)}}/> 2
    <input type="radio" value="3" checked={active === 3} onChange={()=> {setActive(3); props.setNum(3)}}/> 3
    <input type="radio" value="4" checked={active === 4} onChange={()=> {setActive(4); props.setNum(4)}}/> 4
    <input type="radio" value="5" checked={active === 5} onChange={()=> {setActive(5); props.setNum(5)}}/> 5
  </label>
  );
}
export default RadioButtons;