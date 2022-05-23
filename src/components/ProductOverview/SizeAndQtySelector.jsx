import React, { useState } from "react";

const SizeAndQtySelector = ({ skus }) => {
  const [selectedSku, setSelectedSku] = useState(null)
  const [isQtyDisabled, setIsQtyDisabled] = useState(true)
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


  return (
    <form name="product-overview-form" className="product-overview-form">

      <select onChange={handleSizeChange} name="size" id="size-select">
        {makeSizeOptions()}
      </select>
      <select name="quantity" id="quantity-select" disabled={isQtyDisabled}>
        {makeQtyoptions()}
      </select>
      <button>Add to bag</button>
      <button>♡</button>
    </form>
  )
}

export default SizeAndQtySelector

