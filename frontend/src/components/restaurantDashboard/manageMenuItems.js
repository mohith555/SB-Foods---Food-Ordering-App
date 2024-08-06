import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./restaurantMenu.css";
import RHeader from "./restaurantHeader";
import F from "../footer";

const ManageMenuItems = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    itemPrice: "",
    itemPhoto: null
  });
  const [editingItem, setEditingItem] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData(prevState => ({
        ...prevState,
        itemPhoto: files[0]  // Store the file directly
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'itemPhoto' && formData[key]) {
        data.append(key, formData[key]);  // Append the file directly
      } else {
        data.append(key, formData[key]);
      }
    });

    // Debug: Log FormData content
    for (let pair of data.entries()) {
      console.log(pair[0]+ ': '+ pair[1]); 
    }

    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/api/fooditems/${editingItem._id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        await axios.post("http://localhost:5000/api/fooditems", data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
      
      setFormData({
        itemName: "",
        itemDescription: "",
        itemCategory: "",
        itemPrice: "",
        itemPhoto: null
      });
      document.getElementById("itemPhoto").value = null;

      Swal.fire({
        icon: "success",
        title: "Success",
        text: `Food item ${editingItem ? 'updated' : 'added'} successfully`,
      });

      setEditingItem(null);
    } catch (error) {
      console.error(error.response.data); // Log error response
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error saving the food item. Please try again.",
      });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      itemName: item.itemName,
      itemDescription: item.itemDescription,
      itemCategory: item.itemCategory,
      itemPrice: item.itemPrice,
      itemPhoto: null  // Reset itemPhoto for editing
    });
    setEditingItem(item);
  };

  return (
    <div>
      <RHeader currentPage="manageMenuItems" />
      <div className="menu-page">
        <h2>{editingItem ? 'Edit Food Item' : 'Add Food Item'}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="itemDescription">Description:</label>
            <textarea
              id="itemDescription"
              name="itemDescription"
              value={formData.itemDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="itemCategory">Category:</label>
            <input
              type="text"
              id="itemCategory"
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="itemPrice">Price:</label>
            <input
              type="number"
              id="itemPrice"
              name="itemPrice"
              value={formData.itemPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="itemPhoto">Item Photo:</label>
            <input
              type="file"
              id="itemPhoto"
              name="itemPhoto"
              onChange={handleChange}
            />
          </div>
          <button type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
        </form>
      </div>
      <F />
    </div>
  );
};

export default ManageMenuItems;
