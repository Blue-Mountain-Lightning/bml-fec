import React, { useState } from 'react';

const Photos = (props) => {
  console.log('ARRAY', props.arr);
  if (props.arr.length === 0) {
    return;
  }
  return (
    <div>

      {props.arr.map((obj) => {
        return (
          <img src={obj.url} alt={obj.id}  height={150} width={150} />
        );
      })}
    </div>
  );

}
export default Photos;