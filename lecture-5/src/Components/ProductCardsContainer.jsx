import ProductCard from "./ProductCard";

export default function ProductCardsContainer({ data }) {
     // compound state to track the product quantity
  
  return (
    <div className="ProductCardsContainer">
      {data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
