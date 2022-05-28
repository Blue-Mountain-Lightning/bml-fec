import { useState } from 'react';

const CardButton = ({Icon, iconHandler, iconHandlerClose, product}) => {
  if (!Icon) { return };

  const handleIconClick = (e) => {
    e.stopPropagation();
    iconHandler(product);
  }

  Icon = (
    <Icon
      size={'2rem'}
      onClick={handleIconClick}
      className='card-button-icon'
    />
  )


  return (
    <>
      { Icon }
    </>
  )
}

export default CardButton;
