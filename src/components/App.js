import React from "react";
import { Link } from "react-router-dom";
import ProductList from './ProductList.jsx';
import './styles/Styles.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="page-wrapper">
      <ProductList />
      <Outlet />
    </div>
  );
}

export default App;
