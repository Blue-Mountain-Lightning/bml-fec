import React, { useState } from "react";
import { FaAngleDown, FaRegHeart, FaHeart } from 'react-icons/fa';

const SizeAndQtySelector = ({ skus, handleAddToBag }) => {
  const [selectedSku, setSelectedSku] = useState(null)
  const [isQtyDisabled, setIsQtyDisabled] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const isOutOfStock = skus.length === 0 ? true : false;
  const skusArray = Object.entries(skus)

  const handleSizeChange = (event) => {
    event.target.value === '' ? setIsQtyDisabled(true) : setIsQtyDisabled(false)
    setSelectedSku(event.target.value)
  }

  const makeSizeOptions = () => {
    if (isOutOfStock) {
      return <option value="out of stock">OUT OF STOCK</option>
    } else {
      const sizes = []
      sizes.push((<option key="" value="">--Select Size--</option>))
      sizes.push(skusArray.map((sku, index) => {
        return <option key={sku[0] + index} value={sku[0]}>{sku[1].size}</option>
      }))
      return sizes
    }
  }

  const makeQtyoptions = () => {
    let options = []
    const qtyAvailable = skus[selectedSku]?.quantity;

    for (var i = 1; i < qtyAvailable + 1; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  }

  const handleHeartClick = () => {
    setIsFavorite(!isFavorite);
  }


  return (
    <form name="product-overview-form" className="product-overview-form">

      <div className="select-wrapper">
        <span className="select-arrow"><FaAngleDown /></span>
        <select onChange={handleSizeChange} name="size" id="size-select">
          {makeSizeOptions()}
        </select>
      </div>

      <div className="select-wrapper">
        <span className="select-arrow"><FaAngleDown /></span>

        <select name="quantity" id="quantity-select" disabled={isQtyDisabled}>
          {makeQtyoptions()}
        </select>
      </div>

      <div className="add-to-bag-wrapper">
        <button className="button" onClick={handleAddToBag}>Add to Bag</button>
        <div className="heart-button" onClick={handleHeartClick}>{
          isFavorite ? <FaHeart /> : <FaRegHeart />
        }</div>
      </div>


    </form>
  )
}

export default SizeAndQtySelector

