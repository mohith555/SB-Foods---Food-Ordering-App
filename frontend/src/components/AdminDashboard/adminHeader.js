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
          {<li><a href="./adminDashboard">Go Back</a></li>} 
          {/* {currentPage !=='manageOrders' && <li><a href="./manageOrders">Manage Orders</a></li>} */}
          {/* {currentPage !=='manageMenu' && <li><a href="./manageMenus" >Manage Menu</a></li>} */}
          {/* {currentPage !=='addRestaurant' && <li><a href="./addRestaurant">Add Restaurant</a></li>} */}
          {/* {currentPage !== 'manageUsers' && <li><a href="./manageUsers">Manage Users</a></li>} */}
          {currentPage !== 'adminApproveRequest' && <li><a href="./adminApporveRequest">Requests</a></li>}
          
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/" className="auth-button">Logout</Link>
       
      </div>
    </header>
  );
}
