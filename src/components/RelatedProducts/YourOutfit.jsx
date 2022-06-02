import React from 'react';

import { MdDelete } from 'react-icons/md';

import AddToOutfitCard from './AddToOutfitCard';
import ProductRow from './ProductRow';

const OFFSET_VAR = '--your-outfit-shift-offset';
const OFFSET_CLASS = 'your-outfit-shifter';

const YourOutfit = ({product, outfit, handleAddToOutfit, handleRemoveFromOutfit}) => {

  return (
    <div>
      <h1 className='center-heading'>Your outfit</h1>
      <ProductRow
        products={[
          <AddToOutfitCard
            key='addCard'
            product={product}
            handleAddToOutfit={handleAddToOutfit}
          />
        ].concat(outfit)}
        offsetClass={OFFSET_CLASS}
        offsetVar={OFFSET_VAR}
        Icon={MdDelete}
        iconHandler={handleRemoveFromOutfit}
      />
    </div>
  );
}

export default YourOutfit;
