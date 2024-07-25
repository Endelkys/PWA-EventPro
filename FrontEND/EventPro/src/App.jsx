import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Views/Register";
import Login from "./Views/Login";
import Dashboard from "./Views/Dashboard";
import PromotorPage from "./Views/PromotorPage";
import LandingPage from "./Views/LandingPage";
import AdminUsers from "./Views/AdminUsers";
import Profile from "./Views/Profile";
import AboutUs from "./Views/AboutUs";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Eventos from "./Views/Eventos";
import Boletos from "./Views/Boletos";
import Solicitud from "./Views/Solicitud";
import Pagos from "./Views/Pagos";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas publicas */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/promotor" element={<PromotorPage />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/boletos" element={<Boletos />} />
            <Route path="/solicitud" element={<Solicitud />} />
            <Route path="/pagos" element={<Pagos />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
