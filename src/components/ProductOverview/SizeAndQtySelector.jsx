import React, { useState } from "react";

const SizeAndQtySelector = ({ skus }) => {
  const [selectedSku, setSelectedSku] = useState(null)
  const [isQtyDisabled, setIsQtyDisabled] = useState(true)
  const isOutOfStock = skus.length === 0 ? true : false;
  const skusArray = Object.entries(skus)

  console.log('skus', skus)
  console.log('skus Array', skusArray)

  const handleSizeChange = (event) => {
    event.target.value === '' ? setIsQtyDisabled(true) : setIsQtyDisabled(false)
    setSelectedSku(event.target.value)
  }

  const sizeOptions = () => {
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

  const getQtySelect = () => {
    if (isQtyDisabled) {
      return <select name="quantity" id="quantity-select" disabled></select>
    } else {
      let options = []
      const qtyAvailable = skus[selectedSku].quantity;
      for (var i = 1; i < qtyAvailable + 1; i++) {
        options.push(<option value={i}>{i}</option>)
      }

      return (
        <select name="quantity" id="quantity-select">
          {options}
        </select>
      )
    }
  }

  return (
    <form name="product-overview-form" className="product-overview-form">

      <select onChange={handleSizeChange} name="size" id="size-select">
        {sizeOptions()}
      </select>
      {getQtySelect()}
      <button>Add to bag</button>
      <button>♡</button>
    </form>
  )
}

export default SizeAndQtySelector

