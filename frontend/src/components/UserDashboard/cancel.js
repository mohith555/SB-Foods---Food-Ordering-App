import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div style={styles.container}>
      <h1>Operation Cancelled</h1>
      <p>Your action has been cancelled. You can go back to the previous page or visit the home page.</p>
      <div style={styles.buttonContainer}>
        <Link to="/" style={styles.link}>
          <button style={styles.button}>Go to Home</button>
        </Link>
        <Link to="/previous" style={styles.link}>
          <button style={styles.button}>Go Back</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    margin: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  buttonContainer: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
  },
};

export default Cancel;
