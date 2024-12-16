import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getApplicationById, getPetById } from "../services/api";
import { Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import Loader from "../components/shared/Loader";

const ApplicationStatus = ({ status }) => {
  const statusConfig = {
    pending: {
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800",
      label: "Pending Review",
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
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.className}`}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{config.label}</span>
    </div>
  );
};

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    try {
      setLoading(true);
      const response = await getApplicationById(id);
      setApplication(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch application details. Please try again later.");
      console.error("Error fetching application details:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !application) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Application not found"}</p>
        <button
          onClick={() => navigate("/applications/me")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/applications/me")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Applications
      </button>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Application Details
            </h1>
            <ApplicationStatus status={application.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold mb-4">Pet Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={`http://localhost:5000/${application.pet.image}`}
                    alt={application.pet.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-lg">{application.pet.name}</h3>
                <p className="text-gray-600">
                  {application.pet.breed} • {application.pet.age}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Personal Information
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Occupation
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.personalInfo.occupation}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Living Arrangement
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.personalInfo.livingArrangement
                        .charAt(0)
                        .toUpperCase() +
                        application.personalInfo.livingArrangement.slice(1)}
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-4">
                  Questionnaire Responses
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Work Schedule
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.questionnaire.workSchedule
                        .charAt(0)
                        .toUpperCase() +
                        application.questionnaire.workSchedule.slice(1)}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Experience with Pets
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.questionnaire.experience ||
                        "No experience specified"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Has Yard
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.questionnaire.hasYard ? "Yes" : "No"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Other Pets
                    </dt>
                    <dd className="mt-1 text-gray-900">
                      {application.questionnaire.hasOtherPets
                        ? application.questionnaire.otherPetsDetails || "Yes"
                        : "No other pets"}
                    </dd>
                  </div>
                </dl>
              </div>

              {application.additionalNotes && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">
                    Additional Notes
                  </h2>
                  <p className="text-gray-900">{application.additionalNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
