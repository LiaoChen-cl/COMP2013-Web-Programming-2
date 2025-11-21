import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  _id,
  productName,
  image,
  brand,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDeleteProduct,
  setEditingProduct
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
      <button onClick={() => handleDeleteProduct(_id)}>
        Delete
      </button>

    </div>
  );
}
