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
          {<li><a href="./userDashboard">Go Back</a></li>}
          {currentPage !=='myCart' && <li><a href="./myCart">My Cart</a></li>}
          {currentPage !=='userOrders' && <li><a href="./userOrders" >My Orders</a></li>}
          {currentPage !== 'userProfile' && <li><a href="./userProfile">My Profile</a></li>}
          {currentPage !== 'userFeedbackForm' && <li><a href="./userFeedbackForm">Feedback Form</a></li>}
          
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/" className="auth-button">Logout</Link>
       
      </div>
    </header>
  );
}
