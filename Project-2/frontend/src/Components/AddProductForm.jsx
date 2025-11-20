import { useState } from "react";

export default function AddProductForm({ handleAddProduct }) {
  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    brand: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
   if (!formData.productName || !formData.brand || !formData.price || !formData.image) {
    alert("Please fill all required fields!");
    return;
  }


    try {
      const res = await fetch("http://localhost:3000/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to add product");

      const data = await res.json();

      // 生成前端 localId
      const localId = Math.random().toString(36).substr(2, 9);

      // 更新父组件 productList 和 productQuantity
      handleAddProduct({ ...data.product, localId });


      // 提醒用户 MongoDB 自动生成的 _id
      alert(`${data.product.productName} added with MongoDB _id: ${data.product._id}`);


      setFormData({ id: "", productName: "", brand: "", image: "", price: "" });
    } catch (err) {
      console.error(err);
      alert("Error adding product. See console for details.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
      <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required />
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required />
      <input type="text" name="price" placeholder="Price (e.g. 3.65 or $3.65)" value={formData.price} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
}
