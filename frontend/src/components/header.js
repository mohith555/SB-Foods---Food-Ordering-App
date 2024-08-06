// import React from "react";
// import { Link } from "react-router-dom";
// export default function Header() {

//   return (
//     <>
//       <header className="header">
//         <div className="logo">
//           <img
//             src="/images/logosb.png"
//             alt="sb foods"
//             className="lg"
//           />
//           <h1>SB Foods - Food Ordering App</h1>
//         </div>
//         <nav>
//           <ul className="nav-links">
//             <li><a href="#home">Home</a></li>
//             <li><a href="#menu">Menu</a></li>
//             <li><a href="#about">About Us</a></li>
//             <li><a href="#contact">Contact</a></li>
//           </ul>
//         </nav>
//         <div className="auth-buttons">
//           <Link className="auth-button"  >Login</Link>
//           <Link className="auth-button" >Sign Up</Link>
//         </div>
//       </header>
//     </>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ currentPage }) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logosb.png" alt="sb foods" className="lg" />
        <h1>SB Foods - Food Ordering App</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          {currentPage !=='menu' && <li><a href="/menu">Menu</a></li>}
          {currentPage !== 'about' && <li><a href="/about">About Us</a></li>}
          {currentPage!=="contact" &&<li><a href="/contact">Contact</a></li>}
        </ul>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/login" className="auth-button">Sign Up</Link>
      </div>
    </header>
  );
}
