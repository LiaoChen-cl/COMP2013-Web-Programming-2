export default function ProductCard({
  product,
  img,
  productQuantity,
  handle0nChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductCard">
      <img src={img} alt={product} height="100px" />
      <h3>{product}</h3>
      <p>Quantity: {productQuantity?.quantity || 0}</p>

      <select
        value={productQuantity?.currentPrice || 0}
        onChange={(e) =>
          handle0nChangePrice(productQuantity.id, e.target.value)
        }
      >
        {productQuantity?.price0ptions?.map((price, index) => (
          <option key={index} value={price}>
            {price.toFixed(2)}
          </option>
        ))}
      </select>

      <p>
        Total Price:{" "}
        {(
          (productQuantity?.quantity || 0) *
          (productQuantity?.currentPrice || 0)
        ).toFixed(2)}
      </p>

      <button onClick={() => handleAddToQuantity(productQuantity.id)}>
        Add
      </button>
      <button onClick={() => handleRemoveQuantity(productQuantity.id)}>
        Remove
      </button>
      <button onClick={() => handleAddToCart(productQuantity)}>
        Add to Cart
      </button>
    </div>
  );
}
