export default function CartCard({product,quantity, currentPrice}) {
  return (
    <div className="CartCard">
     
      <h3>{product}</h3>
      <p>Quantity: {quantity}</p>
      <p>
        Total Price: $
        {(quantity * currentPrice).toFixed(2)}
      </p>
      <button onClick={() => handleRemoveFromCart(id,product,quantity,currentPrice)}>
        Remove from Cart
      </button>
    </div>
  );
}   