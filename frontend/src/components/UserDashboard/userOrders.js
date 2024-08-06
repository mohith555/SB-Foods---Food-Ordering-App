import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UHeader from "./userHeader";
import F from "../footer";
// import './userOrders.css'; // Make sure this file exists and is properly styled

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user-orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response ? error.response.data : error.message);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div>
      <UHeader currentPage="userOrders" />
      <div className="orders-container">
        <h1>Your Orders</h1>
        {orders.length > 0 ? (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-box">
                <h3>Order ID: {order._id}</h3>
                <p><strong>Total Amount:</strong> ₹ {order.totalAmount}</p>
                <p><strong>Payment Status:</strong> {order.paymentStatus === 'paid' ? 'Paid' : 'Pending'}</p>
                <div className="order-items">
                  {order.items.map(item => (
                    <div key={item.foodItem._id} className="order-item">
                      <img src={`http://localhost:5000/${item.foodItem.itemPhoto}`} alt={item.foodItem.itemName} className="order-item-photo" />
                      <div className="order-item-details">
                        <h4>{item.foodItem.itemName}</h4>
                        <p><strong>Price:</strong> ₹ {item.foodItem.itemPrice}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You have no orders yet.</p>
        )}
      </div>
      <F />
    </div>
  );
}
