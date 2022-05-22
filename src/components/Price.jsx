
const Price = ({style, fontSize}) => {
  let price = style["original_price"];

  if (style['sale_price']!== null) {
    return (
      <div className='text-all-caps'>
        <s>${style['original_price']}</s>
        <span className='sale-price'> ${style['sale_price']}</span>
      </div>
    )
  }

  return (
    <div className='text-all-caps'>${price}</div>
  )
}

export default Price;

