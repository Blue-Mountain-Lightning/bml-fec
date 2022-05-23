import React from "react";

const StyleCircle = ({ url, index, handleStylesClick, currentStyleIndex }) => {

  let className = "card-style-circle";
  if (index === currentStyleIndex) {
    className += " current";
  }

  return (
    <img className={className} onClick={() => handleStylesClick(index)} src={url} alt={`style ${index}`} />
  )
}

export default StyleCircle;