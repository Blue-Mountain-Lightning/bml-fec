import React from 'react';

import { useState, useEffect, useRef } from 'react';
import { MdDelete } from 'react-icons/md';

import AddToOutfitCard from './AddToOutfitCard';
import ProductRow from './ProductRow';

const OFFSET_VAR = '--your-outfit-shift-offset';
const OFFSET_CLASS = 'your-outfit-shifter';

const YourOutfit = ({product}) => {
  const [currentProduct, setCurrentProduct] = useState();
  const [outfit, setOutfit] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const handleAddOutfit = (event) => {
    if (yourOutfit.current.indexOf(
      (product) => yourOutfit.current[product].id === currentProduct.id
    ) !== -1) {
      return;
    }
    yourOutfit.current.push(currentProduct);
    setOutfit(yourOutfit.current);
  }

  const yourOutfit = useRef([
    <AddToOutfitCard handleAddOutfit={handleAddOutfit}/>
  ]);


  const removeOutfit = (productId) => {
    yourOutfit.current.splice(
      yourOutfit.current.indexOf((p) => p.id === productId), 0
    );
    setOutfit(yourOutfit);
  }

  useEffect(() => {
    setCurrentProduct(product);
    setOutfit([<AddToOutfitCard handleAddOutfit={handleAddOutfit}/>])
    setLoaded(true);
  }, [product]);


  if (!loaded) {
    return null;
  }

  return (
    <div>
      <h1 className='center-heading'>Your outfit</h1>
      <ProductRow
        products={outfit}
        offsetClass={OFFSET_CLASS}
        offsetVar={OFFSET_VAR}
        Icon={MdDelete}
        iconHandler={removeOutfit}
      />
    </div>
  );
}

export default YourOutfit;
