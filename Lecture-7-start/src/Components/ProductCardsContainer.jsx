import ProductCard from "./ProductCard";

export default function ProductCardsContainer({
  data,
  productQuantity,
  handleOnChangePrice,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductCardsContainer">
      {data.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          productQuantity={productQuantity.find((prod) => prod.id === product.id)}
          handle0nChangePrice={handle0nChangePrice}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
