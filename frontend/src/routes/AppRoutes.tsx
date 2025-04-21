import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/common/Login";
import SignUp from "../pages/common/SignUp";

import AuthLayout from "../layouts/AuthLayout";
import TaskManager from "../pages/TaskManager";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
       {/* Redirect root path to /login */}
  <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Auth routes with shared layout */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      {/* Main app route */}
      <Route path="/taskmanager" element={<ProtectedRoute> <TaskManager /> </ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;
