import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import H from './header';  // Assuming header is a separate component

export default function Login() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    userType: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setError('');
    setFormData({
      username: '',
      password: '',
      email: '',
      confirmPassword: '',
      userType: 'user',
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, email, confirmPassword, userType } = formData;
    setLoading(true);
    setError('');

    try {
      if (showLogin) {
        // Handle login
        const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        console.log('Login successful:', res.data);

        // Save user ID and token in local storage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome, ${res.data.user.username}!`,
          showCloseButton: false,
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.close) {
            navigate(res.data.redirectUrl || '/');
          }
        });
      } else {
        // Handle registration
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const res = await axios.post('http://localhost:5000/api/auth/register', {
          username,
          email,
          password,
          userType,
        });
        console.log('Registration successful:', res.data);
        setError('');
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'You have successfully registered.',
          showCloseButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
          }
        });
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data.error : 'An error occurred.');
      setError(error.response ? error.response.data.error : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <H />
      <div className="login-container">
        <div className={`login-welcome-message ${showLogin ? 'login-message-slide-left' : 'login-message-slide-right'}`}>
          <div className="login-welcome-content">
            <h1>Hello, Friend!</h1>
            {!showLogin && <p>Registration successful. Please login with your new account.</p>}
            <p>{showLogin ? "Don't have an account? Click here to register." : "Already have an account? Click here to login."}</p>
            <button onClick={toggleForm} className="login-toggle-button">
              {showLogin ? 'Sign Up' : 'Back to Login'}
            </button>
          </div>
        </div>

        <form className={`login-form ${showLogin ? 'login-form-slide-left' : 'login-form-slide-right'}`} onSubmit={handleSubmit}>
          <h1>{showLogin ? 'Sign In' : 'Create Account'}</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {showLogin && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}
          {!showLogin && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <div>
                <label htmlFor="userType">User Type:</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="user">User</option>
                  <option value="restaurantAdmin">Restaurant Admin</option>
                </select>
              </div>
            </>
          )}
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : showLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </>
  );
}
