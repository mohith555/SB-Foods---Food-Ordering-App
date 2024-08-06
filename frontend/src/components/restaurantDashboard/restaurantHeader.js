import React from "react";
import { Link } from "react-router-dom";


export default function Header({ currentPage }) {
  return (
    
    <header className="header">
      <div className="logo">
        <img src="/images/logosb.png" alt="sb foods" className="lg" />
        <h1>SB Foods - Food Ordering App</h1>
      </div>
      <nav>
        <ul className="nav-links">
          {<li><a href="./RestaurantDashboard">Go Back</a></li>}
          {currentPage !=='createRestaurant' && <li><a href="./createRestaurant">Create Restaurant</a></li>}
          {currentPage !=='manageMenuItems' && <li><a href="./manageMenuItems" >Manage Menu Items</a></li>}
          {currentPage !=='manageCustomerOrders' && <li><a href="./manageCustomerOrders" >Manage Customer Orders</a></li>}
          {currentPage !== 'viewCustomerFeedback' && <li><a href="./viewCustomerFeedback">View Customer Feedback</a></li>}
          
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/" className="auth-button">Logout</Link>
       
      </div>
    </header>
  );
}
