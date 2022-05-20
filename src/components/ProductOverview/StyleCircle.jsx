import React from "react";

const StyleCircle = ({ url, index }) => {
  return (
    <img className="style-circle" src={url} alt={`style ${index}`} />
  )
}

export default StyleCircle;