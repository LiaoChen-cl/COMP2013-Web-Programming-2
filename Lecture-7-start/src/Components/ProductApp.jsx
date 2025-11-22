import { useState } from "react";
import ProductCardsContainer from "./ProductCardsContainer";

export default function ProductApp({ data }) {
  const [productQuantity, setProductQuantity] = useState({
    quantity,
    price0ptions: []
  });


  // 减少数量
const handleRemoveQuantity = (productId) => {
  const newProductQuantity = productQuantity.map((prod) => {
    return { ...prod, quantity: prod.quantity - 1 };
  });
  setProductQuantity(newProductQuantity);
};

// 添加到购物车
const handleAddToCart = (productToAdd) => {
  const currentProduct = data.find((prod) => prod.id === productToAdd.id); // 检查是否在购物车

  if (productToAdd.quantity === 0) {
    alert("Please add quantity before adding to cart!");
    return;
  }

  if (!productInCart) {
  setCart((prevCart) => [
    ...prevCart,
    {
      ...productToAdd,
      quantity: productToAdd.quantity,
      currentPrice: productToAdd.currentPrice,
    },
  ]);
  } else {
    alert("Item already exist in cart!");
 }
};

// remove elected items from cart
const handleRemoveFromCart = (productId) => {
  
    const filteredCart = prevCart.filter((item) => item.id !== productId);
    setCart(filteredCart);
};



  return (
   <div>
  <div>
    <ProductCardsContainer
      data={data}
      productQuantity={productQuantity}
      handle0nChangePrice={handle0nChangePrice}
      handleAddToQuantity={handleAddToQuantity}
      handleRemoveQuantity={handleRemoveQuantity}
      handleAddToCart={handleAddToCart}
    />
  </div>
</div>

  );
}




