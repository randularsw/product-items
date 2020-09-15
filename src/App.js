import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemsList from "./modules/items-list";
import CartProvider from "./core/cartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <ItemsList />
      </CartProvider>
    </div>
  );
}

export default App;
