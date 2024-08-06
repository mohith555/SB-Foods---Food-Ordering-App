import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Payment Successful</h1>
      <p style={styles.message}>Thank you for your purchase! Your payment has been processed successfully.</p>
      <Link to="/" style={styles.homeLink}>Return to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f4f8',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    padding: '0 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
  },
  homeLink: {
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007bff',
    padding: '0.5rem 1rem',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default Success;
