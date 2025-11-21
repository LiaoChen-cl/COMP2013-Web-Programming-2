import { useState, useEffect } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

export default function GroceriesAppContainer() {
  const [productList, setProductList] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cart, setCart] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);


  // 获取数据库产品
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProductList(res.data);
      setProductQuantity(res.data.map(p => ({
        id: p._id,
        quantity: 0,
        currentPrice: parseFloat(p.price.replace("$", "")),
        productName: p.productName,
        img: p.image || ""
      })));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // 增减数量
  const handleAddToQuantity = id =>
    setProductQuantity(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  const handleRemoveQuantity = id =>
    setProductQuantity(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p));

  // 添加到购物车
  const handleAddToCart = product => {
    if (product.quantity === 0) return alert("Please add quantity first!");
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p);
      return [...prev, { ...product }];
    });
  };

  // 添加新产品
 const handleAddProduct = async (newProduct) => {
    try {
      const productToSend = {
        ...newProduct,
        price: newProduct.price.startsWith("$") ? newProduct.price : "$" + newProduct.price
      };

      const res = await axios.post("http://localhost:3000/products", productToSend);
      const addedProduct = res.data.product;

      if (!addedProduct) {
        console.warn("Product not added. Server returned null.");
        return; // 不更新前端
      }

      // 前端直接加到列表
      setProductList(prev => [...prev, addedProduct]);
      setProductQuantity(prev => [
        ...prev,
        {
          id: addedProduct._id,
          quantity: 0,
          currentPrice: parseFloat(addedProduct.price.replace("$", "")),
          productName: addedProduct.productName,
          img: addedProduct.image || ""
        }
      ]);
    } catch (err) {
      console.error("Failed to add product:", err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      // 更新前端列表
      setProductList(prev => prev.filter(p => p._id !== id));
      setProductQuantity(prev => prev.filter(p => p.id !== id));
      setCart(prev => prev.filter(p => p.id !== id)); // 如果在购物车里也删掉

    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
  };


  // 更新产品（编辑）
  const handleUpdateProduct = (updatedProduct) => {
    setProductList(prev =>
      prev.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
    );

    alert(`${updatedProduct.productName} has been updated!`);
    setEditingProduct(null); // 清空表单
  };



  return (
    <>
      <NavBar cartCount={cart.length} username="Liao" />
      <div className="GroceriesAppContainer">
        <AddProductForm 
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct} 
          editingProduct={editingProduct}
          
        />
        <div className="MainContent">
          <ProductsContainer
            data={productList}
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleDeleteProduct={handleDeleteProduct}
            handleEditClick={handleEditClick}
          />
          <CartContainer cart={cart} setCart={setCart} />
        </div>
      </div>
    </>
  );
}
