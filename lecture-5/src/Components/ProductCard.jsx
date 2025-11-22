import {useState} from 'react';
import data from "../data/data"
const testProduct = data[0];//import data for testing


export default function ProductCard({ 
    product = testProduct.product, //adding default values incase data is not provided so the app won't break
    priceOptions = testProduct.priceOptions,
    img = testProduct.img,
    //quantity = testProduct.quantity
     quantity = testProduct.quantity,
}) {
    console.log(testProduct);
    const [productQuantity, setProductQuantity] = useState({
        quantity,
        priceOptions: priceOptions[0],

    });
    
    //building our output
    return(
        <div className="ProductCard">
            <img src={img} alt=""  height="100px"/>
            <h3>{product}</h3>
            <p>Quantity: {productQuantity.quantity}</p>
            {/* onchange event is responsible for updating to set the state*/}
            <select 
            value={productQuantity.priceOptions} 
            onChange={(e) => 
                setProductQuantity((prevData) => {
                    return { ...prevData, priceOptions: parseFloat(e.target.value) };
                })
            
            }
        >
            {priceOptions.map((price, index) => (
                <option key={index} value={price}>
                    {price.toFixed(2)}
                </option>
            ))}

            </select>
            <p>
                Total Price: ${ (productQuantity.quantity * productQuantity.priceOptions).toFixed(2) }
            </p>
            <button onClick={() => 
                setProductQuantity((prevData) => {
                    return { ...prevData, quantity: prevData.quantity + 1 };
                })
            }>Add</button>
            <button onClick={() => 
                setProductQuantity((prevData) => {
                    return {
                        ...prevData,
                        quantity: prevData.quantity > 0 ? prevData.quantity - 1 : 0
                    };
                })
            }>Remove</button>
        </div>
    )
};