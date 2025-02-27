
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NavBar from "./components/Dashboard";

// import ApplicationList from "./components/ApplicationList";

// import VolunteerRegistrationForm from "./components/volunteerRegistrationForm";
// import OrganizationRegistrationForm from "./components/organizationRegistration";
// import LoginForm from "./components/loginForm";
// import Calendar from "./components/Calendar";
import './App.css'
// import { useState } from 'react';
// import DashboardCards from "./components/DashboardCard"
// import ProfileCard from "./components/DashboardProfileCard";
// import ProfileUpdateForm  from "./components/VolunteerProfileUpdateFrom"
import VolunteerDashBoard from "./Pages/VolunteerDashBoard"
import VolunteerEventsPage from "./Pages/VolunteerEventsPage";
import VolunteerProfilePage from "./Pages/VolunteerProfilePage";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (<>
    <ToastContainer position="top-right" autoClose={3000} />
    <BrowserRouter>
     <Routes>
      <Route path="/volunteer/dashboard" element={<VolunteerDashBoard/>}/>
      <Route path="/volunteer/profile" element={<VolunteerProfilePage/>}/>
      <Route path="/volunteer/events" element={<VolunteerEventsPage/>}/>
     </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
