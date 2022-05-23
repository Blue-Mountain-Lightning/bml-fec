
// Props:
// style: the inner result object of the selected style
// fontSize: the font size to render
const Price = ({style, fontSize}) => {
  let price = style["original_price"];
  let fontStyle = fontSize ? {"fontSize": fontSize} : {};
  console.log(fontStyle);

  if (style['sale_price']!== null) {
    return (
      <div style={fontStyle}>
        <span style={fontStyle} className='sale-price'>${style['sale_price']} </span>
        <s style={fontStyle}>${style['original_price']}</s>
      </div>
    )
  }

  return (
    <div style={fontStyle}>${price}</div>
  )
}

export default Price;

