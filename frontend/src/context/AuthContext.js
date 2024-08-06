import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await axios.get('http://localhost:5000/api/auth/check', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data.user);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (formData) => {
    const { username, password } = formData;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      console.log('Login successful:', res.data);

      // Save user ID and token in local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome, ${res.data.user.username}!`,
        showCloseButton: true,
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
          navigate(res.data.redirectUrl || '/'); // Redirect to the appropriate dashboard
        }
      });

      setUser(res.data.user);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.error : 'An error occurred.');
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response ? error.response.data.error : 'An error occurred.',
        showCloseButton: true,
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
