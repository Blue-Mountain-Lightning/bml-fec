import React from "react";
import { Link } from "react-router-dom";
import './App.css';
import ProductList from './ProductList.jsx';

function App() {
  return (
    <div className="App">
      <ProductList />
      <Link to="/details">Product Details</Link>
    </div>
  );
}

export default App;
