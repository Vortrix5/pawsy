import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "./styles/globals.css";

// Layout Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import PetListing from "./pages/PetListing";
import PetDetails from "./pages/PetDetails";
import AdoptionForm from "./pages/AdoptionForm";
import Dashboard from "./pages/Dashboard";
import AdminPets from "./pages/admin/AdminPets";
import AdminApplications from "./pages/admin/AdminApplications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ApplicationDetails from "./pages/ApplicationDetails";

function AppContent() {
  const location = useLocation();

  // Only show footer on these routes
  const showFooterRoutes = ["/", "/pets", "/pets/:id", "/login", "/register"];
  const shouldShowFooter = showFooterRoutes.some((route) => {
    // Convert route pattern to regex to handle dynamic routes
    const pattern = new RegExp("^" + route.replace(":id", "[^/]+") + "$");
    return pattern.test(location.pathname);
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<PetListing />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/adopt/:id"
            element={
              <ProtectedRoute>
                <AdoptionForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/me"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/pets"
            element={
              <ProtectedRoute adminOnly>
                <AdminPets />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute adminOnly>
                <AdminApplications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
