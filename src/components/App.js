import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar/NavBar.jsx";
import ProductList from './ProductList.jsx';
import './styles/Styles.css';
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="page-wrapper">
      <NavBar />
      <ProductList />
    </div>
  );
}

export default App;
