import { useState, useEffect } from "react";
import axios from "axios";
import AddProductForm from "./AddProductForm";
import ProductsContainer from "./ProductsContainer";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";


// wait, btw, it looks like a little bit mass and confused
// cuz I use  id: p._id, so some looks id some looks _id
// but there are same thing is _id

// Main container for the groceries app
// fetching products, managing cart, and managing add/edit product form

export default function GroceriesAppContainer() {
  // State for list of products from backend
  const [productList, setProductList] = useState([]);
  
  
  // tracking product quantities locally
  const [productQuantity, setProductQuantity] = useState([]);
  // list of products added to cart
  const [cart, setCart] = useState([]);

  // edit product
  const [editingProduct, setEditingProduct] = useState(null);

  // message after add or edit
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all products from backend on component mount
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      setProductList(response.data);

      // Initialize quantity tracking for each product
      // Note: using id: p._id for local state, a bit confusing but consistent
      setProductQuantity(response.data.map(p => ({
        id: p._id,
        quantity: 0,
        currentPrice: parseFloat(p.price.replace("$", "")),
        productName: p.productName,
        img: p.image || ""
      })));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // increase/decrease quantity
  // id: p._id, the id is _id
  const handleAddToQuantity = id =>
    setProductQuantity(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p));
  const handleRemoveQuantity = id =>
    setProductQuantity(prev => prev.map(p => p.id === id ? { ...p, quantity: Math.max(p.quantity - 1, 0) } : p));

  // add to cart, and merge same one
   // id: p._id, the id is _id
  const handleAddToCart = product => {
    if (product.quantity === 0) return alert("Please add quantity first!");
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + product.quantity } : p);
      return [...prev, { ...product }];
    });
  };

  // remove all things in cart
  const handleRemoveFromCart = (_id) => {
    setCart(prev => prev.filter(item => item.id === _id ? false : true));
  };

  // add quatity in cart
  const handleCartAddQuantity = (_id) => {
    setCart(prev => prev.map(item =>
      item.id === _id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // remove quantity in cart
  const handleCartRemoveQuantity = (_id) => {
    setCart(prev => prev.map(item =>
      item.id === _id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    ));
  };

  // Add new product to backend and update frontend
  const handleAddProduct = async (newProduct) => {
    try {
      const productToSend = {
        ...newProduct,
        price: newProduct.price.startsWith("$") ? newProduct.price : "$" + newProduct.price
      };

      const response = await axios.post("http://localhost:3000/products", productToSend);
      const addedProduct = response.data.product;

      if (!addedProduct) {
        console.warn("Product not added. Server returned null.");
        return; // fialed not update
      }

      // update frontend list
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

      // add suceesfully message
      setSuccessMessage(`Product "${addedProduct.productName}" added successfully with _id: ${addedProduct._id}`);

    } catch (error) {
      console.error("Failed to add product:", error.message);
    }
  };

  // Delete product both backend and frontend
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);

      // updat front
      setProductList(prev => prev.filter(p => p._id !== id));
      setProductQuantity(prev => prev.filter(p => p.id !== id));
      setCart(prev => prev.filter(p => p.id !== id)); // 如果在购物车里也删掉

    } catch (error) {
      console.error("Delete failed:", error.message);
    }
  };

  // click edit,set editingProduct state, clear previous messge
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setSuccessMessage("");
  };


  // Update product after editing
  const handleUpdateProduct = (updatedProduct) => {
    // Update productQuantity list
    setProductList(prev =>
      prev.map(p => (p._id === updatedProduct._id ? updatedProduct : p))
    );

    // Update productQuantity list
    setProductQuantity(prev =>
      prev.map(p =>
        p.id === updatedProduct._id
          ? {
              ...p,
              currentPrice: parseFloat(updatedProduct.price.replace("$", "")),
              productName: updatedProduct.productName,
              img: updatedProduct.image || ""
            }
          : p
      )
    );

    // Clear editing state to reset buttomn back
    setEditingProduct(null);

    setSuccessMessage(`Product "${updatedProduct.productName}" edited successfully. _id: ${updatedProduct._id}`);
  };

  return (
    <>
     {/* Navbar with cart count */}
      <NavBar cartCount={cart.length} username="Liao" />
      <div className="GroceriesAppContainer">
        {/* Form for adding or editing product */}
        <AddProductForm 
          handleAddProduct={handleAddProduct}
          handleUpdateProduct={handleUpdateProduct} 
          editingProduct={editingProduct}
          successMessage={successMessage}
          setSuccessMessage={setSuccessMessage}
          setEditingProduct={setEditingProduct}
        />

        <div className="MainContent">
          {/* Products display area */}
          <ProductsContainer
            data={productList}
            productQuantity={productQuantity}
            handleAddToQuantity={handleAddToQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleDeleteProduct={handleDeleteProduct}
            setEditingProduct={handleEditClick} 
          />

          {/* Cart display area */}
          <CartContainer 
            cart={cart}
            handleRemoveFromCart={handleRemoveFromCart}        
            handleAddToQuantity={handleCartAddQuantity}        
            handleRemoveQuantity={handleCartRemoveQuantity}    
            handleEmptyCart={() => setCart([])}               
          />
        </div>
      </div>
    </>
  );
}
