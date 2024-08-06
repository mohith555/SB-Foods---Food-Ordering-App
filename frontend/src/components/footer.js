import React from "react"
export default function Method(){
    return(
        <footer className="footer">
        <div className="footer-container">
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/menu">Menu</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/fb.png" alt="Facebook" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/x.png" alt="Twitter" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/insta.png" alt="Instagram" />
              </a>
            </div>
          </div>
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <p>Email: contact@SBFoodOrderingApp.com</p>
            <p>Phone:12345567809</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 SB Foods - Food Ordering App. All rights reserved.</p>
        </div>
      </footer>
    )
}