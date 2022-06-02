import React from "react";
import NavBar from "./NavBar/NavBar.jsx";
import ProductList from './ProductList.jsx';
import './styles/Styles.css';

function App() {
  return (
    <div className="page-wrapper">
      <NavBar />
      <ProductList />
    </div>
  );
}

export default App;
