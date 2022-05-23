import React from "react";

const ProductSlogan = ({ product }) => {
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
                <li>😎 First bullet</li>
                <li>😎 Second bullet</li>
                <li>😎 Third bullet</li>
                <li>😎 Fourth bullet</li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>

  )
}

export default ProductSlogan