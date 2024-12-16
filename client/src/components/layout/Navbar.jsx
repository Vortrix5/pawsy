import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PawPrint, UserCircle, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <PawPrint className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary">Pawsy</span>
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/pets" className="text-gray-700 hover:text-primary">
              Find a Pet
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/applications/me"
                  className="text-gray-700 hover:text-primary"
                >
                  My Applications
                </Link>

                {isAdmin && (
                  <>
                    <Link
                      to="/admin/applications"
                      className="text-gray-700 hover:text-primary"
                    >
                      Manage Applications
                    </Link>
                    <Link
                      to="/admin/pets"
                      className="text-gray-700 hover:text-primary"
                    >
                      Manage Pets
                    </Link>
                  </>
                )}

                <div className="relative">
                  <button
                    className="flex items-center gap-2 text-gray-700 hover:text-primary"
                    onClick={() => setShowDropdown(!showDropdown)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span>{user.name}</span>
                  </button>
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <button
                        onClick={logout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
