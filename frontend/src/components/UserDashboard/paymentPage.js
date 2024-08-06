import React, { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function PaymentPage() {
  const orderId = localStorage.getItem('orderId');
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!orderId) {
      Swal.fire({
        icon: "error",
        title: "Order Error",
        text: "Order ID not found. Please try again.",
      }).then(() => {
        window.location.href = '/Cart'; // Redirect back to cart if no order ID
      });
    }
  }, [orderId]);

  const handlePayment = async () => {
    // Simulate payment processing
    const paymentSuccess = true; // Replace with actual payment status from payment gateway

    try {
      const response = await axios.post('http://localhost:5000/api/finalize-payment', {
        orderId,
        paymentStatus: paymentSuccess,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was successful and the order is confirmed.",
        }).then(() => {
          window.location.href = '/UserOrders'; // Redirect to UserOrders page
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: response.data.error || "An error occurred while processing the payment.",
        });
      }
    } catch (error) {
      console.error("Error finalizing payment:", error.response ? error.response.data : error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.response ? error.response.data.error : "An error occurred while processing the payment.",
      });
    }
  };

  return (
    <div>
      <h1>Payment Page</h1>
      {/* Payment form or integration with payment gateway here */}
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}
