import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  image,
  brand,
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  onDelete,
  onEdit
}) {
  const pq = productQuantity || { id: null, quantity: 0, currentPrice: 0 };

  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={productName} height="100px" />
      <p>{brand}</p>

      <QuantityCounter
        quantity={pq.quantity}
        onAdd={() => handleAddToQuantity(pq.id)}
        onRemove={() => handleRemoveQuantity(pq.id)}
        min={0}
      />

      <p>Price: ${pq.currentPrice.toFixed(2)}</p>
      <p>Total: ${(pq.quantity * pq.currentPrice).toFixed(2)}</p>

      <button onClick={() => handleAddToCart(pq)}>Add to Cart</button>
      {onEdit && <button onClick={() => onEdit(pq)}>Edit</button>}
      {onDelete && <button onClick={() => onDelete(pq.id)}>Delete</button>}
    </div>
  );
}
