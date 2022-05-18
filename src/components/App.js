import React from "react";
import { Link } from "react-router-dom";
import ProductList from './ProductList.jsx';
import './styles/Styles.css';

function App() {
  return (
    <div className="page-wrapper">

      <ProductList />
      <Link to="/details">Product Details</Link>
    </div>
  );
}

export default App;
