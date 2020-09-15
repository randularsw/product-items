import React, { Component } from "react";
export const CartContext = React.createContext();

class CartProvider extends Component {
  state = {
    price: 0,
    cartItems: [],
  };

  newCartItem = (item) => {
    try {
      const cartItems = this.state.cartItems;
      let price;
      let isFound = false;
      cartItems.forEach((cartItem) => {
        if (item.id === cartItem.id) {
          cartItem.quantity++;
          cartItem.price = cartItem.details.price * cartItem.quantity;
          price = this.state.price + cartItem.details.price;

          isFound = true;
        }
      });
      if (!isFound) {
        item.quantity = 1;
        item.price = item.details.price;
        price = this.state.price + item.details.price;
        cartItems.push(item);
      }
      this.setState({ cartItems, price });
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
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
