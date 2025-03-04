import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NavBar from "./components/Dashboard";

// import ApplicationList from "./components/ApplicationList";

// import VolunteerRegistrationForm from "./components/volunteerRegistrationForm";
// import OrganizationRegistrationForm from "./components/organizationRegistration";
// import LoginForm from "./components/loginForm";
// import Calendar from "./components/Calendar";
import "./App.css";
// import { useState } from 'react';
// import DashboardCards from "./components/DashboardCard"
// import ProfileCard from "./components/DashboardProfileCard";
// import ProfileUpdateForm  from "./components/VolunteerProfileUpdateFrom"
import VolunteerDashBoard from "./Pages/VolunteerDashBoard";
import VolunteerEventsPage from "./Pages/VolunteerEventsPage";
import VolunteerProfilePage from "./Pages/VolunteerProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
              path="/dashboard"
              element={  <ProtectedRoute>
                <VolunteerDashBoard />
              </ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><VolunteerProfilePage /></ProtectedRoute>}
            />
            <Route path="/events" element={<ProtectedRoute><VolunteerEventsPage/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
