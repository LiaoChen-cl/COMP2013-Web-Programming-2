import { useState } from "react";
import cartEmpty from "../assets/cart-empty.png";
import cartFull from "../assets/cart-full.png";
import React from "react";

// NavBar is top navigation 
// showing greeting, app title and cart status.
export default function NavBar({ cartCount, username }) {
  return (
    <div className="NavBar">
         {/* Greeting with the current user's name */}
      <div className="user-greet">Hello, {username}</div>
      {/* App title / branding */}
      <h1>Grocery Store🍎</h1>
      {/* Cart icon area: switches image depending on whether cart has items.
          If cartCount > 0, show full-cart image and a visible badge. */}
      <div className="cart-icon">
        <img
            src={cartCount > 0 ? cartFull : cartEmpty}
            alt="cart"
            width="40"
        />
       
      </div>

    </div>
  );
}