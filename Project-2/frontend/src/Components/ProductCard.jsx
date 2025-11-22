import QuantityCounter from "./QuantityCounter";

// ProductCard displays a single product in the product list
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
  // fallback in case productQuantity is not found
  const pq = productQuantity || { id: null, quantity: 0, currentPrice: 0 };

  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={productName} height="100px" />
      <p>{brand}</p>



       {/* QuantityCounter component handles increase/decrease */}
      <QuantityCounter
        quantity={pq.quantity}
        onAdd={() => handleAddToQuantity(pq.id)}
        onRemove={() => handleRemoveQuantity(pq.id)}
        min={0} //lowest is 0
      />


      {/* Display price and total for this quantity */}
      <p>Price: ${pq.currentPrice.toFixed(2)}</p>
      <p>Total: ${(pq.quantity * pq.currentPrice).toFixed(2)}</p>


      {/* Add this product to cart with current quantity */}
      <button onClick={() => handleAddToCart(pq)}>Add to Cart</button>

       {/* Edit button sets the AddProductForm into editing mode */}
      <button style={{ backgroundColor: "rgb(76, 43, 226)"}} onClick={() => setEditingProduct({
        _id: _id, // database _id is required for PATCH
        productName,
        brand,
        image,
        price: pq.currentPrice.toFixed(2) // convert to string to match form
      })}>
        Edit
      </button>
     
     {/* Delete button removes product both backend and frontend */}
      <button style={{ backgroundColor: "red"}}onClick={() => handleDeleteProduct(_id)}>Delete</button>



 
    </div>
  );
}
