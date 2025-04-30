import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ApplicantDashboard from "./components/Applicant/ApplicantDashboard";
import MyApplications from "./components/Applicant/MyApplications";
import CompanyDashboard from "./components/Company/CompanyDashboard";

function App() {
  return (
    <Router>
      <div className="p-4 bg-gray-200">
        <nav className="mb-4">
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard" className="mr-4">Dashboard</Link>
          <Link to="/my-applications">My Applications</Link>
        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ApplicantDashboard />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
