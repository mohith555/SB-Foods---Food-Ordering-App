// src/components/SomeComponent.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Adjust according to your context setup

const SomeComponent = () => {
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    // Only fetch userId if not in context
    if (!userId) {
      const fetchUserId = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/auth/check', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if necessary
            }
          });
          // This line may not be needed if using context for userId
          // setUserId(response.data.userId);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user ID:', error.response ? error.response.data : error.message);
          setLoading(false);
        }
      };

      fetchUserId();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>User ID: {userId}</p>}
    </div>
  );
};

export default SomeComponent;
