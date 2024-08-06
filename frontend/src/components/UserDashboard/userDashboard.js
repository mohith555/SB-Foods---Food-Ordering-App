import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './userDashboard.css';
// import './sweetalert2-custom.css'; // Import custom CSS for SweetAlert2
import F from '../footer';
import RHeader from './userHeader';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

export default function UserDashboard() {
  const [foodItems, setFoodItems] = useState([]);
  const { user, loading } = useAuth(); // Get user from context

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fooditems');
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: error.response ? error.response.data.error : 'An error occurred while fetching food items.',
        });
      }
    };

    fetchFoodItems();
  }, []);

  const handleAddToCart = async (item) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User is not authenticated.',
      });
      return;
    }

    // Show SweetAlert2 to get the quantity from the user
    const { value: quantity } = await Swal.fire({
      title: 'Select Quantity',
      input: 'number',
      inputLabel: 'Enter quantity',
      inputPlaceholder: '1',
      inputAttributes: {
        min: 1,
        step: 1
      },
      confirmButtonText: 'Add to Cart',
      showCancelButton: true,
      cancelButtonText: 'Cancel'
    });

    if (quantity) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`http://localhost:5000/api/cart/${user.id}/add`, {
          foodItemId: item._id,
          quantity: parseInt(quantity, 10)
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Show success message
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: `${item.itemName} has been added to your cart.`,
          confirmButtonText: 'OK',
        });
      } catch (error) {
        console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
        Swal.fire({
          icon: 'error',
          title: 'Add to Cart Error',
          text: error.response ? error.response.data.error : 'An error occurred while adding the item to the cart.',
        });
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <RHeader currentPage="userDashboard" />
      <div className="food-items-container">
        <h2>Food Items</h2>
        <div className="food-items-list">
          {foodItems.map((item) => (
            <div key={item._id} className="food-item-box">
              <img src={`http://localhost:5000/${item.itemPhoto}`} alt={item.itemName} className="food-item-photo" />
              <div className="food-item-content">
                <h3 className="food-item-name">{item.itemName}</h3>
                <p className="food-item-details"><strong>Category:</strong> {item.itemCategory}</p>
                <p className="food-item-details"><strong>Description:</strong> {item.itemDescription}</p>
                <p className="food-item-details"><strong>Price:</strong> ₹ {item.itemPrice}</p>
                <button onClick={() => handleAddToCart(item)} className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <F />
    </div>
  );
}
