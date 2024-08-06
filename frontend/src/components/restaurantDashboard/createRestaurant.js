import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./restaurantRegistration.css";
import RHeader from "./restaurantHeader";
import F from "../footer";

export default function CreateRestaurant() {
  const [restaurantName, setRestaurantName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantPicture, setRestaurantPicture] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    const checkApprovalStatus = async () => {
      const savedData = localStorage.getItem('submissionData');
      if (savedData) {
        const { submitted, data } = JSON.parse(savedData);
        setSubmitted(submitted);
        setSubmissionData(data);

        if (data && data.id) {
          try {
            const response = await axios.get(`http://localhost:5000/api/restaurants/${data.id}`);
            const restaurant = response.data;
            if (restaurant.approved) {
              setApprovalStatus("Approved");
              setRestaurantDetails(restaurant);

              Swal.fire({
                icon: "success",
                title: "Approved",
                text: "Your restaurant has been approved.",
              });
            }
          } catch (error) {
            console.error("Error fetching restaurant details:", error.response ? error.response.data : error.message);
            Swal.fire({
              icon: "error",
              title: "Fetch Error",
              text: error.response ? error.response.data.error : "An error occurred while fetching restaurant details.",
            });
          }
        }
      }
    };

    checkApprovalStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("restaurantName", restaurantName);
    formData.append("ownerName", ownerName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("description", description);
    formData.append("restaurantPicture", restaurantPicture);

    try {
      const response = await axios.post("http://localhost:5000/api/restaurants", formData);
      const { _id } = response.data.restaurant;
      const timestamp = new Date().toLocaleString();
      const data = {
        id: _id,
        timestamp,
        restaurantName,
        ownerName,
      };

      localStorage.setItem('submissionData', JSON.stringify({ submitted: true, data }));
      setSubmissionData(data);
      setSubmitted(true);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Your restaurant has been submitted for approval.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response ? error.response.data.error : "An error occurred during registration.",
      });
    }
  };

  const handleReopenForm = () => {
    localStorage.removeItem('submissionData');
    setSubmitted(false);
    setRestaurantName("");
    setOwnerName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setDescription("");
    setRestaurantPicture(null);
    setSubmissionData(null);
    setRestaurantDetails(null); // Reset restaurant details
  };

  return (
    <div>
      <RHeader currentPage="createRestaurant" />
      <div className="registration-form">
        {approvalStatus === "Approved" ? (
          <div>
            <h2>Your Restaurant Has Been Approved!</h2>
            <p>Thank you for your submission. Your restaurant details are now visible to the public.</p>
            {restaurantDetails && (
              <div>
                <h3>Restaurant Details:</h3>
                <p><strong>Restaurant Name:</strong> {restaurantDetails.restaurantName}</p>
                <p><strong>Owner Name:</strong> {restaurantDetails.ownerName}</p>
                <p><strong>Email:</strong> {restaurantDetails.email}</p>
                <p><strong>Phone:</strong> {restaurantDetails.phone}</p>
                <p><strong>Address:</strong> {restaurantDetails.address}</p>
                <p><strong>Description:</strong> {restaurantDetails.description}</p>
                {restaurantDetails.restaurantPicture && (
                  <div>
                    <strong>Picture:</strong>
                    <img src={`http://localhost:5000/${restaurantDetails.restaurantPicture}`} alt="Restaurant" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                  </div>
                )}
              </div>
            )}
          </div>
        ) : submitted ? (
          <div>
            <h2>Restaurant Registration Submitted</h2>
            <p>Your restaurant has been submitted for approval. You will be notified once it is approved.</p>
            <div>
              <h3>Submission Details:</h3>
              <p><strong>Timestamp:</strong> {submissionData.timestamp}</p>
              <p><strong>Restaurant Name:</strong> {submissionData.restaurantName}</p>
              <p><strong>Owner Name:</strong> {submissionData.ownerName}</p>
            </div>
            <button onClick={handleReopenForm}>Submit Another Restaurant</button>
          </div>
        ) : (
          <>
            <h2>Restaurant Registration</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="restaurantName">Restaurant Name:</label>
                <input
                  type="text"
                  id="restaurantName"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="ownerName">Owner Name:</label>
                <input
                  type="text"
                  id="ownerName"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div>
                <label htmlFor="restaurantPicture">Restaurant Picture:</label>
                <input
                  type="file"
                  id="restaurantPicture"
                  onChange={(e) => setRestaurantPicture(e.target.files[0])}
                  required
                />
              </div>
              <button type="submit">Register Restaurant</button>
            </form>
          </>
        )}
      </div>
      <F />
    </div>
  );
}
