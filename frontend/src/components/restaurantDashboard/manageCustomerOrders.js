import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RHeader from './restaurantHeader';
import F from '../footer';
import './manageOrder.css';

const ManageCustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const adminId = localStorage.getItem('adminId'); // Fetch the adminId from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/admin/orders/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: error.response ? error.response.data.error : 'An error occurred while fetching orders.',
        });
      }
    };

    if (adminId) {
      fetchOrders();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Admin Error',
        text: 'Admin ID not found. Please log in again.',
      });
    }
  }, [adminId]);

  const updateOrderStatus = async (orderId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`http://localhost:5000/api/orders/${orderId}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
        );
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `Order status updated to ${newStatus}.`,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Error',
          text: 'An error occurred while updating the order status.',
        });
      }
    } catch (error) {
      console.error('Error updating status:', error.response ? error.response.data : error.message);
      Swal.fire({
        icon: 'error',
        title: 'Update Error',
        text: error.response ? error.response.data.error : 'An error occurred while updating the order status.',
      });
    }
  };

  return (
    <div>
      <RHeader currentPage="manageCustomerOrders" />
      <div className="manage-orders-container">
        <h1>Manage Orders</h1>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-box">
              <h3>Order ID: {order._id}</h3>
              <p>Total: ₹ {order.total}</p>
              <p>Status: {order.status}</p>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.foodItem._id} className="order-item">
                    <img src={`http://localhost:5000/${item.foodItem.itemPhoto}`} alt={item.foodItem.itemName} />
                    <div>
                      <h4>{item.foodItem.itemName}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹ {item.foodItem.itemPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
              {order.status !== 'Delivered' && (
                <div className="order-actions">
                  {order.status === 'Ordered' && (
                    <button onClick={() => updateOrderStatus(order._id, 'In Progress')}>Mark as In Progress</button>
                  )}
                  {order.status === 'In Progress' && (
                    <button onClick={() => updateOrderStatus(order._id, 'Delivered')}>Mark as Delivered</button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <F />
    </div>
  );
};

export default ManageCustomerOrders;
