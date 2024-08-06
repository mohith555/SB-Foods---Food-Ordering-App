// Frontend: App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Ensure this uses useNavigate
import M from "./components/mainpage";
import Login from "./components/login";
import A from "./components/About";
import C from "./components/contact";
import Menu from "./components/Menu";
import UserDashboard from "./components/UserDashboard/userDashboard";
import UserOrders from "./components/UserDashboard/userOrders";
import UserProfile from "./components/UserDashboard/userProfile";
import MyCart from "./components/UserDashboard/myCart";
import UserFeedbackForm from "./components/UserDashboard/userFeedbackForm";
import AdminDashboard from "./components/AdminDashboard/adminDashboard";
import AdminApporveRequest from "./components/AdminDashboard/adminApporveRequest";
import ManageOrders from "./components/AdminDashboard/manageOrders";
import ManageUsers from "./components/AdminDashboard/manageUsers";
import ManageMenus from "./components/AdminDashboard/manageMenu";
import RestaurantDashboard from "./components/restaurantDashboard/RestaurantDashboard";
import ManageMenuItems from "./components/restaurantDashboard/manageMenuItems";
import CreateRestaurant from "./components/restaurantDashboard/createRestaurant";
import AddRestaurant from "./components/AdminDashboard/addRestaurant";
import ManageCustomerOrders from "./components/restaurantDashboard/manageCustomerOrders";
import ViewCustomerFeedback from "./components/restaurantDashboard/viewCustomerFeedback";
import Checkout from "./components/UserDashboard/checkout";
import PaymentPage from "./components/UserDashboard/paymentPage";




export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<M />} />
          <Route path="/login" element={<Login />} />
          <Route path="/About" element={<A />} />
          <Route path="/contact" element={<C />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/UserOrders" element={<UserOrders />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/MyCart" element={<MyCart />} />
          <Route path="/UserFeedbackForm" element={<UserFeedbackForm />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/ManageOrders" element={<ManageOrders />} />
          <Route path="/ManageUsers" element={<ManageUsers />} />
          <Route path="/ManageMenus" element={<ManageMenus />} />
          <Route path="/RestaurantDashboard" element={<RestaurantDashboard />} />
          <Route path="/ManageMenuItems" element={<ManageMenuItems />} />
          <Route path="/CreateRestaurant" element={<CreateRestaurant />} />
          <Route path="/AddRestaurant" element={<AddRestaurant />} />
          <Route path="/ManageCustomerOrders" element={<ManageCustomerOrders />} />
          <Route path="/ViewCustomerFeedback" element={<ViewCustomerFeedback />} />
          <Route path="/AdminApporveRequest" element={<AdminApporveRequest />} />
          <Route path="/Checkout" element={<Checkout/>} />
          <Route path="/PaymentPage" element={<PaymentPage/>} />
       
        </Routes>
      </AuthProvider>
    </Router>
  );
}
