import {MdAdd} from 'react-icons/md';

const AddToOutfitCard = ({product, handleAddToOutfit}) => {
  const handleClick = (event) => {
    event.preventDefault();
    handleAddToOutfit(product);
  }

  return (
    <div className='dummy-product-card' onClick={handleClick}>
      <button className='dummy-product-card-graphic'>
        <MdAdd className='dummy-product-card-icon' size='6rem'/>
      </button>
      <div className='dummy-product-card-bottom'>
        <span className='click-to-add'>click to add {product.name}</span>
      </div>
    </div>
  )
}

export default AddToOutfitCard;
