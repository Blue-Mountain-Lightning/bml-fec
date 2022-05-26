import React from "react";

const ProductSlogan = ({ product }) => {
  //if (!product.features) return <></>;
  return (
    <div className="section">
      <div className="container">
        <div className="page-padding">
          <div className="slogan-grid">
            <div>
              <h3>{product.slogan}</h3>
              <p>{product.description}</p>
            </div>
            <div>
              <ul>
                {product.features && product.features.map((feature) => {
                  return <li>{feature.feature} : {feature.value}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductSlogan