import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Signup from './pages/signup';
import Login from './pages/Login';
import { useState } from 'react';
import ManagerDashboard from './Dashboards/ManagerDashboard';
import EmployeeDashboard from './Dashboards/EmployeeDashboard';

export const baseURL="https://task-manager-server-5.onrender.com";


const App = () => {
  const [user, setUser] = useState(null); // Store logged-in user

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
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
    </div>
  )
}

export default App

