import { MdDelete } from 'react-icons/md';

import AddToOutfitCard from './AddToOutfitCard';
import ProductRow from './ProductRow';

const YourOutfit = ({product, outfit, handleAddToOutfit, handleRemoveFromOutfit}) => {

  const items = [
    <AddToOutfitCard
      key='addCard'
      product={product}
      handleAddToOutfit={handleAddToOutfit}
    />
  ].concat(outfit)

  return (
    <div>
      <h1 className='center-heading'>Your outfit</h1>
      <ProductRow
        products={items}
        Icon={MdDelete}
        iconHandler={handleRemoveFromOutfit}
      />
    </div>
  );
}

export default YourOutfit;
