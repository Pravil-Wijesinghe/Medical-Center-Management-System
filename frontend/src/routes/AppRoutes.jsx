import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from '../pages/Login';
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import BasicInformation from "../pages/dashboard/BasicInformation";
import Security from "../pages/dashboard/Security";
import Appointments from "../pages/dashboard/Appointments";
import FamilyMembers from "../pages/dashboard/FamilyMembers";
import MedicalHistory from "../pages/dashboard/MedicalHistory";
import Notifications from "../pages/dashboard/Notifications";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login/>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="basic-information" replace />} />
        <Route path="basic-information" element={<BasicInformation />} />
        <Route path="security" element={<Security />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="family-members" element={<FamilyMembers />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;