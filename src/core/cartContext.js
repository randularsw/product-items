import React, { Component } from "react";
export const CartContext = React.createContext();

class CartProvider extends Component {
  state = {
    price: 0.0,
    cartItems: [],
    count: 0,
  };

  newCartItem = (item) => {
    try {
      const cartItems = this.state.cartItems;
      let price;
      let isFound = false;
      cartItems.forEach((cartItem) => {
        if (item.id === cartItem.id) {
          cartItem.quantity++;
          cartItem.price =
            Math.round(cartItem.details.price * cartItem.quantity * 100) / 100;
          price = this.state.price + cartItem.details.price;
          price =
            Math.round((this.state.price + cartItem.details.price) * 100) / 100;
          isFound = true;
        }
      });
      if (!isFound) {
        item.quantity = 1;
        item.price = item.details.price;
        price = Math.round((this.state.price + item.details.price) * 100) / 100;
        cartItems.push(item);
      }
      this.setState({ cartItems, price, count: this.state.count + 1 });
    } catch (err) {
      console.log(err);
    }
  };

  removeCartItem = (id) => {
    try {
      let cartItems = this.state.cartItems;
      cartItems = cartItems.filter((cartItem) => {
        return id !== cartItem.id;
      });
      let count = 0;
      let price = 0.0;
      cartItems.forEach((cartItem) => {
        count += cartItem.quantity;
        price +=
          Math.round(cartItem.details.price * cartItem.quantity * 100) / 100;
      });
      this.setState({ cartItems, price, count });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          newCartItem: this.newCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
