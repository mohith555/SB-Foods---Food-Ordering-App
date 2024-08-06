import React, { useState } from "react";
import "./userFeedbackForm.css"; // Import the CSS file
import UHeader from "./userHeader";
import F from "../footer";

export default function UserFeedbackForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission, e.g., send the data to a server
      console.log("Feedback submitted:", { name, email, rating, comments });
      alert("Thank you for your feedback!");
      // Clear the form fields
      setName("");
      setEmail("");
      setRating(5);
      setComments("");
    };
  
  return (
    <div>
        <UHeader currentPage="userFeedbackForm" />
      <div className="feedback-form">
        <h2>Customer Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            >
              <option value="1">1 - Very Dissatisfied</option>
              <option value="2">2 - Dissatisfied</option>
              <option value="3">3 - Neutral</option>
              <option value="4">4 - Satisfied</option>
              <option value="5">5 - Very Satisfied</option>
            </select>
          </div>
          <div>
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
      <F />
      
    </div>
  )
}
