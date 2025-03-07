import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import OrganizationDashBoard from "./Pages/OrganizaitonDashBoard";
import VolunteerDashboard from "./Pages/VolunteerDashboard";
import VolunteerEventsPage from "./Pages/VolunteerEventsPage";
import VolunteerProfilePage from "./Pages/VolunteerProfilePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useAuth } from "./AuthContext";
import ScrollToTop from "./components/ScrollTop";

function App() {

  const {user}=useAuth();

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route
              path="/dashboard"
              element={  <ProtectedRoute>
               {user?.role==="organization"?<OrganizationDashBoard/>:<VolunteerDashboard/>}
              </ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><VolunteerProfilePage /></ProtectedRoute>}
            />
            <Route path="/events" element={<ProtectedRoute><VolunteerEventsPage/></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
    
    </>
  
  );
}

export default App;
