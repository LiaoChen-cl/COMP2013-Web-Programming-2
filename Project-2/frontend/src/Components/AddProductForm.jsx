import { useState } from "react";

export default function AddProductForm({ handleAddProduct }) {
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.brand || !formData.price) {
      alert("Please fill all required fields!");
      return;
    }

    // 交给 GroceriesAppContainer 处理
    handleAddProduct(formData);

    // 清空表单
    setFormData({ productName: "", brand: "", image: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="AddProductForm">
      <h3>Add New Product</h3>
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={formData.productName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="price"
        placeholder="Price (e.g. 3.65 or $3.65)"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
}
