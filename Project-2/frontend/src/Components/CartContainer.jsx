// ...existing code...
import CartCard from "./CartCard";


// CartContainer,cart summary for list of items all in cart


export default function CartContainer({
  cart,
  handleRemoveFromCart,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleEmptyCart
}) {
    // Compute total number of items in the cart, sum of quantities)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // Compute total price across all items (quantity * unit price)
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.currentPrice,
    0
  );

  return (
    <div className="CartContainer">
      {/* Always display total items */}
      <h3>Total items: {totalItems}</h3>

      {cart.length === 0 ? (
        // Show message when cart is empty
        <p className="empty-cart">No items in the cart.</p>
      ) : (
        <>
         {/* Render a CartCard for each item in the cart */}
          {cart.map((item) => (
            <CartCard
              key={item.id}
              _id={item.id}
              productName={item.productName}
              image={item.img || item.image}
              quantity={item.quantity}
              currentPrice={item.currentPrice}
              handleRemoveFromCart={handleRemoveFromCart}
              handleAddToQuantity={handleAddToQuantity}
              handleRemoveQuantity={handleRemoveQuantity}
            />
          ))}
        {/* empty the cart or proceed to checkout */}
          <div className="cart-buttons">
            <button className="RemoveButton" onClick={handleEmptyCart}>
              Empty Cart
            </button>
            <button id="BuyButton">
            {/* Show checkout button with formatted total price */}
              Check out: <br /> ${totalPrice.toFixed(2)}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
     