
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import UHeader from "./userHeader";
import F from "../footer";
import './myCart.css'; // Make sure to add CSS for styling

export default function MyCart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem('userId'); // Fetch the userId from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCart(response.data);
        calculateTotal(response.data.items); // Calculate total when cart is fetched
      } catch (error) {
        console.error("Error fetching cart:", error.response ? error.response.data : error.message);
        Swal.fire({
          icon: "error",
          title: "Fetch Error",
          text: error.response ? error.response.data.error : "An error occurred while fetching cart data.",
        });
      }
    };

    if (userId) {
      fetchCart();
    } else {
      Swal.fire({
        icon: "error",
        title: "User Error",
        text: "User ID not found. Please log in again.",
      });
    }
  }, [userId]);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + (item.foodItem.itemPrice * item.quantity), 0);
    setTotal(totalAmount);
  };

  const handleRemoveFromCart = async (foodItemId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:5000/api/cart/${userId}/remove/${foodItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart((prevCart) => {
        const updatedItems = prevCart.items.filter(item => item.foodItem._id !== foodItemId);
        calculateTotal(updatedItems); // Recalculate total after removing item
        return { ...prevCart, items: updatedItems };
      });
      Swal.fire({
        icon: "success",
        title: "Removed from Cart",
        text: "The item has been removed from your cart.",
      });
    } catch (error) {
      console.error("Error removing item from cart:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response ? error.response.data.error : "An error occurred while removing the item from the cart.",
      });
    }
  };

  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('token');
    const orderData = {
      userId,
      items: cart.items,
      totalAmount: total,
    };
  
    try {
      Swal.fire({
        icon: "info",
        title: "Order Initializing",
        text: "Your order is being processed. Please wait...",
        showConfirmButton: false,
        timer: 3000
      });
  
      // Send order initialization request
      const response = await axios.post('http://localhost:5000/api/checkout', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        // Store orderId in localStorage and redirect to payment page
        localStorage.setItem('orderId', response.data.orderId);
        localStorage.setItem('checkoutItems', JSON.stringify(cart.items));
        localStorage.setItem('checkoutTotal', total);
        window.location.href = '/Checkout'; // Redirect to payment page
      } else {
        Swal.fire({
          icon: "error",
          title: "Checkout Error",
          text: response.data.error || "An error occurred while placing the order.",
        });
      }
    } catch (error) {
      console.error("Error proceeding to payment:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Checkout Error",
        text: error.response ? error.response.data.error : "An error occurred while placing the order.",
      });
    }
  };
  
  return (
    <div>
      <UHeader currentPage="myCart" />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.items && cart.items.length > 0 ? (
          <>
            <div className="cart-items-list">
              {cart.items.map((item) => (
                <div key={item.foodItem._id} className="cart-item-box">
                  <img src={`http://localhost:5000/${item.foodItem.itemPhoto}`} alt={item.foodItem.itemName} className="cart-item-photo" />
                  <div className="cart-item-content">
                    <h3 className="cart-item-name">{item.foodItem.itemName}</h3>
                    <p className="cart-item-details"><strong>Category:</strong> {item.foodItem.itemCategory}</p>
                    <p className="cart-item-details"><strong>Description:</strong> {item.foodItem.itemDescription}</p>
                    <p className="cart-item-details"><strong>Price:</strong> ₹ {item.foodItem.itemPrice}</p>
                    <p className="cart-item-details"><strong>Quantity:</strong> {item.quantity}</p>
                    <button onClick={() => handleRemoveFromCart(item.foodItem._id)} className="remove-from-cart-button">Remove from Cart</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h3>Total: ₹ {total}</h3>
              <button onClick={handleProceedToPayment} className="proceed-to-payment-button">Proceed to Payment</button>
            </div>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <F />
    </div>
  );
}
