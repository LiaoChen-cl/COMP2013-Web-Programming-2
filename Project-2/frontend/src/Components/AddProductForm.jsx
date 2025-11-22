import { useState, useEffect } from "react";
import axios from "axios"; // install axios befor


// This component adding new product and editing 
export default function AddProductForm({ 
  handleAddProduct, 
  editingProduct, 
  handleUpdateProduct, 
  setEditingProduct, 
  successMessage, 
  setSuccessMessage //the two for add and edit suceesfully message
}) {
  // formData for form input
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: ""
  });

  // editingProduct changes than update formData 
   useEffect(() => {
    if (editingProduct) {
      setFormData({
        // I use mongodb _id to patch as unique one
        _id: editingProduct._id,   
        productName: editingProduct.productName || "",
        brand: editingProduct.brand || "",
        image: editingProduct.image || "",
        price: editingProduct.price ? String(editingProduct.price) : ""
      });
      
    } else {
      // its for the form add or edit
      // If not editing, clear the form for adding a new product
      // other click need to reset any success message
    
      setFormData({ productName: "", brand: "", image: "", price: "" });
    }
    
    

  }, [editingProduct]); // run whenever editingProduct changes


  // input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // previous state to avoid overwriting other fields
  };


  // form subssion
  const handleSubmit = async (e) => {
    e.preventDefault();
    //make sure required fields are filled
    if (!formData.productName || !formData.brand || !formData.price) {
      alert("Please fill all required fields!");
      return;
    }

    if (editingProduct) {
      // editing, send PATCH request
      try {
        const updatedProduct = {
          productName: formData.productName,
          brand: formData.brand,
          image: formData.image,
          //cuz for $ consis
          price: formData.price.startsWith("$") ? formData.price : "$" + formData.price
        };
        const response = await axios.patch(
          `http://localhost:3000/products/${formData._id}`,
          updatedProduct
        );
        // update parent with edited product
        handleUpdateProduct(response.data.product);  

      } catch (error) {
        console.error("Update failed:", error.message);
      }
    } else {
      // Add new PRoduct
      handleAddProduct(formData);
    }

    // reset after sub
    setFormData({ productName: "", brand: "", image: "", price: "" });
    // resetedit to swith bottonm back
    setEditingProduct(null);
   
  };

  return (
    <form onSubmit={handleSubmit} className="AddProductForm">
      <h3>Add New Product</h3>
      {/* form thing need to fill */}
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        required
      />
      <br />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <br />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <br />


      {/* Button switches acording state */}
      <button type="submit">
        {editingProduct ? "Save Edit" : "Add Product"}
      </button>


      <br />

      {/* message sucessfull add and edit*/}
      {successMessage && (
        <p>{successMessage}</p>
      )}

    </form>
  );
}
