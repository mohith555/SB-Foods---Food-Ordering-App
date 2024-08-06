import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UHeader from "./userHeader";
import F from "../footer";
import './profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    photo: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          photo: null,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'photo' && formData[key]) {
        formDataToSend.append(key, formData[key]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });
      const data = await response.json();
      setUser(data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <UHeader currentPage="userProfile" />
      <div className="profile-container">
        {!editing ? (
          <div className="profile-info">
            <h2>Profile</h2>
            <img src={user.photo || 'https://via.placeholder.com/150'} alt="Profile" />
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <h2>Edit Profile</h2>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </label>
            <label>
              Address:
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </label>
            <label>
              Photo:
              <input type="file" name="photo" onChange={handleFileChange} />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          </form>
        )}
      </div>
      <F />
    </div>
  );
};

export default Profile;
