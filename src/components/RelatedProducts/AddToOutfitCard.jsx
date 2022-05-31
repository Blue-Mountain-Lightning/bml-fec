import {MdAdd} from 'react-icons/md';

const AddToOutfitCard = ({product, handleAddToOutfit}) => {
  const handleClick = (event) => {
    event.preventDefault();
    handleAddToOutfit(product);
  }

  return (
    <div className='dummy-product-card'>
      <button
        className='dummy-product-card-graphic'
        onClick={handleClick}
      >
        <span>click to add</span>
        <MdAdd className='dummy-product-card-icon' size='6rem'/>
      </button>
    </div>
  )
}

export default AddToOutfitCard;
