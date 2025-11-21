import ProductCard from "./ProductCard";

export default function ProductsContainer({
  data,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDeleteProduct
}) {
  return (
    <div className="ProductsContainer">
      {data.map(product => (
        <ProductCard
          key={product._id}
          {...product}
          productQuantity={productQuantity.find(p => p.id === product._id)}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleDeleteProduct={handleDeleteProduct}
        />
      ))}
    </div>
  );
}
