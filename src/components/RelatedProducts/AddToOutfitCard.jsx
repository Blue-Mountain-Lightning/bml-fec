import {MdAdd} from 'react-icons/md';

const AddToOutfitCard = ({handleAddOutfit}) => {

  return (
    <div className='dummy-product-card'>
      <button
        className='dummy-product-card-graphic'
        onClick={handleAddOutfit}
      >
        <span>click to add</span>
        <MdAdd className='dummy-product-card-icon' size='6rem'/>
      </button>
    </div>
  )
}

export default AddToOutfitCard;
