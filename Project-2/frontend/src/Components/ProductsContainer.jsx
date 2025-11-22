import ProductCard from "./ProductCard";


// ProductsContainer displays the list of products

export default function ProductsContainer({
  data,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  handleDeleteProduct,
  setEditingProduct
}) {
  return (
    <div className="ProductsContainer">
      {data.map(product => (
        <ProductCard
          key={product._id}
          {...product}
          // spread product info (_id, productName, brand, image, etc.)
          // link quantity info by matching _id from productQuantity array
          productQuantity={productQuantity.find(p => p.id === product._id)}
          handleAddToQuantity={handleAddToQuantity}
          handleRemoveQuantity={handleRemoveQuantity}
          handleAddToCart={handleAddToCart}
          handleDeleteProduct={handleDeleteProduct}
          setEditingProduct={setEditingProduct}
        />
      ))}
    </div>
  );
}
