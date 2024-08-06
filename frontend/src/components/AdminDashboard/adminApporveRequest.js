import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AH from "./adminHeader";
import F from "../footer";
import "./requestApporval.css"; // Ensure this CSS file is created and properly styled

const AdminApproveRequest = () => {
  const [pendingRestaurants, setPendingRestaurants] = useState([]);

  useEffect(() => {
    const fetchPendingRestaurants = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/pending");
        console.log(response.data); // Log response to ensure data structure
        setPendingRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching pending restaurants:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while fetching pending restaurants.",
        });
      }
    };

    fetchPendingRestaurants();
  }, []);

  const handleApproval = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/approve/${id}`);
      setPendingRestaurants(pendingRestaurants.filter(restaurant => restaurant._id !== id));
      Swal.fire({
        icon: "success",
        title: "Approved",
        text: "Restaurant approved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while approving the restaurant.",
      });
    }
  };

  const handleRejection = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/reject/${id}`);
      setPendingRestaurants(pendingRestaurants.filter(restaurant => restaurant._id !== id));
      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "Restaurant rejected successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while rejecting the restaurant.",
      });
    }
  };

  return (
    <div>
      <AH currentPage="adminApprovePage" />
      <div className="main-content">
        <h1>Welcome to The Admin Approval Request Form</h1>
        <div className="admin-dashboard">
          <h2>Pending Restaurant Registrations</h2>
          <ul>
            {pendingRestaurants.map(restaurant => (
              <li key={restaurant._id}>
                <h3>{restaurant.restaurantName}</h3>
                <p><strong>Owner:</strong> {restaurant.ownerName}</p>
                <p><strong>Email:</strong> {restaurant.email}</p>
                <p><strong>Phone:</strong> {restaurant.phone}</p>
                <p><strong>Address:</strong> {restaurant.address}</p>
                <p><strong>Description:</strong> {restaurant.description}</p>
                <button onClick={() => handleApproval(restaurant._id)}>Approve</button>
                <button onClick={() => handleRejection(restaurant._id)}>Reject</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <F />
    </div>
  );
};

export default AdminApproveRequest;
