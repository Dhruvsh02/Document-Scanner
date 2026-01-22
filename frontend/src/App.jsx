import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";


function App() {
 return (
  <AuthProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route 
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
    </BrowserRouter>
  </AuthProvider>

 );
}
export default App;
