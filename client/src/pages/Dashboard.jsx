import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserApplications } from "../services/api";
import { Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import Loader from "../components/shared/Loader";

const ApplicationStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800",
      label: "Pending",
    },
    approved: {
      icon: CheckCircle,
      className: "bg-green-100 text-green-800",
      label: "Approved",
    },
    rejected: {
      icon: XCircle,
      className: "bg-red-100 text-red-800",
      label: "Rejected",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getUserApplications();
      setApplications(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch applications. Please try again.");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {location.state?.message && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          {location.state.message}
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600 mt-1">Track your adoption applications</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Your Applications
          </h2>

          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                You haven't submitted any applications yet
              </p>
              <button
                onClick={() => navigate("/pets")}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Browse Available Pets
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer group"
                  onClick={() => navigate(`/applications/${application._id}`)}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={`http://localhost:5000/${application.pet.image}`}
                      alt={application.pet.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {application.pet.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {application.pet.breed} • {application.pet.age}
                      </p>
                      <div className="mt-1">
                        <ApplicationStatus status={application.status} />
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
