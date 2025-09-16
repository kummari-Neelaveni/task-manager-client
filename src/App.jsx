import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbarr from './components/Navbar/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import EmployeeDashboard from './Dashboards/EmployeeDashboard';

export const baseURL="https://task-manager-server-5.onrender.com";

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  ); // Load user from localStorage

  // Keep localStorage in sync with state
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      {/* Pass user and setUser to Navbar */}
      <Navbarr user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Role-based dashboards */}
        <Route
          path="/manager"
          element={
            user?.role === "manager" ? (
              <ManagerDashboard setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/employee"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
