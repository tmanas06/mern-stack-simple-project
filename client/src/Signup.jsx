// Frontend - OrderForm.js

import React, { useState } from 'react';
import axios from 'axios';

export default function OrderForm() {
    const [order, setOrder] = useState({
        products: [],
        shippingDetails: {
            address: '',
            contact: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('shippingDetails')) {
            setOrder({
                ...order,
                shippingDetails: {
                    ...order.shippingDetails,
                    [name.split('.')[1]]: value
                }
            });
        } else {
            setOrder({
                ...order,
                [name]: value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/orders', order);
            console.log(response.data);
            
            setOrder({
                products: [],
                shippingDetails: {
                    address: '',
                    contact: ''
                }
            });
            alert("Order submitted successfully");
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to submit order");
        }
    };

    return (
        <div>
            <h1>Customer Order Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Products:</label>
                <select name="products" onChange={handleChange} value={order.products}>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                </select>
                <br />
                <label>Shipping Address:</label>
                <input type="text" name="shippingDetails.address" onChange={handleChange} value={order.shippingDetails.address} />
                <br />
                <label>Contact Number:</label>
                <input type="text" name="shippingDetails.contact" onChange={handleChange} value={order.shippingDetails.contact} />
                <br />
                <button type="submit">Submit Order</button>
            </form>
        </div>
    );
}
