
// Props:
// style: the inner result object of the select style
// fontSize: the font size to render
const Price = ({style, fontSize}) => {
  let price = style["original_price"];
  let fontStyle = fontSize ? {"fontSize": fontSize} : {};
  console.log(fontStyle);

  if (style['sale_price']!== null) {
    return (
      <div className='text-all-caps' style={fontStyle}>
        <s style={fontStyle}>${style['original_price']}</s>
        <span style={fontStyle} className='sale-price'> ${style['sale_price']}</span>
      </div>
    )
  }

  return (
    <div className='text-all-caps' style={fontStyle}>${price}</div>
  )
}

export default Price;

