import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import UHeader from './userHeader';
import F from '../footer';
import './checkout.css';
// import { REACT_APP_STRIPE_PUBLIC_KEY } from '../../../../Backend/config';

const stripePromise = loadStripe(); // Replace with your Stripe publishable key

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const userId = localStorage.getItem('userId'); // Fetch the userId from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCart(response.data);
        calculateTotal(response.data.items); // Calculate total when cart is fetched
      } catch (error) {
        console.error('Error fetching cart:', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: error.response ? error.response.data.error : 'An error occurred while fetching cart data.',
        });
      }
    };

    if (userId) {
      fetchCart();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'User Error',
        text: 'User ID not found. Please log in again.',
      });
    }
  }, [userId]);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.foodItem.itemPrice * item.quantity, 0);
    setTotal(totalAmount);
  };

  const CheckoutForm = ({ total, cart }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
      event.preventDefault();
    
      if (!stripe || !elements) {
        return;
      }
    
      const cardElement = elements.getElement(CardElement);
    
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
    
      if (error) {
        console.error('Error creating payment method:', error);
        Swal.fire({
          icon: 'error',
          title: 'Payment Error',
          text: error.message,
        });
      } else {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          if (!userId) {
            throw new Error('User ID is not available in local storage.');
          }
    
          const items = cart.items.map(item => ({
            itemName: item.foodItem.itemName,
            itemPrice: item.foodItem.itemPrice,
            quantity: item.quantity,
          }));
    
          const response = await axios.post('http://localhost:5000/api/payment', {
            amount: total * 100, // Stripe uses the smallest currency unit
            id: paymentMethod.id,
            userId,
            items,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Payment Successful',
              text: 'Your payment has been processed successfully.',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/userDashboard'; // Redirect to User Orders page
              }
            });
          } else {
            console.error('Payment failed:', response.data.error);
            Swal.fire({
              icon: 'error',
              title: 'Payment Error',
              text: 'An error occurred while processing your payment.',
            });
          }
        } catch (error) {
          console.error('Payment error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Payment Error',
            text: error.message,
          });
        }
      }
    };
    
    
    return (
      <form onSubmit={handleSubmit}>
        <h3>Payment Details</h3>
        <CardElement />
        <button type="submit" disabled={!stripe}>Pay</button>
      </form>
    );
  };

  return (
    <Elements stripe={stripePromise}>
      <UHeader currentPage="checkout" />
      <div className="checkout-container">
        {!showPaymentForm ? (
          <>
            <h1>Order Summary</h1>
            <div className="cart-items-list">
              {cart.items && cart.items.map((item) => (
                <div key={item.foodItem._id} className="cart-item-box">
                  <img src={`http://localhost:5000/${item.foodItem.itemPhoto}`} alt={item.foodItem.itemName} className="cart-item-photo" />
                  <div className="cart-item-content">
                    <h3 className="cart-item-name">{item.foodItem.itemName}</h3>
                    <p className="cart-item-details"><strong>Category:</strong> {item.foodItem.itemCategory}</p>
                    <p className="cart-item-details"><strong>Description:</strong> {item.foodItem.itemDescription}</p>
                    <p className="cart-item-details"><strong>Price:</strong> ₹ {item.foodItem.itemPrice}</p>
                    <p className="cart-item-details"><strong>Quantity:</strong> {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total: ₹ {total}</h3>
            <button onClick={() => setShowPaymentForm(true)}>Checkout Now</button>
          </>
        ) : (
          <div className="payment-form-container">
            <CheckoutForm total={total} cart={cart} /> {/* Pass cart to CheckoutForm */}
          </div>
        )}
      </div>
      <F />
    </Elements>
  );
};

export default Checkout;
