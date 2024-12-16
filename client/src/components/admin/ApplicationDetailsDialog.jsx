import {
  Clock,
  CheckCircle,
  XCircle,
  User,
  PawPrint,
  Calendar,
  Home,
  Briefcase,
  X as CloseIcon,
} from "lucide-react";
import { useEffect } from "react";

const ApplicationDetailsDialog = ({
  application,
  isOpen,
  onClose,
  onStatusUpdate,
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !application) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <CloseIcon className="h-5 w-5" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Application Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Pet Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Pet Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={`http://localhost:5000/${application.pet.image}`}
                      alt={application.pet.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-lg">
                    {application.pet.name}
                  </h4>
                  <p className="text-gray-600">
                    {application.pet.breed} • {application.pet.age}
                  </p>
                </div>
              </div>

              {/* Right Column - Application Details */}
              <div className="space-y-6">
                {/* Applicant Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Applicant Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="font-medium">
                          {application.applicant.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Applied on{" "}
                          {new Date(application.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Occupation
                        </p>
                        <p className="text-gray-600">
                          {application.personalInfo.occupation}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Living Arrangement
                        </p>
                        <p className="text-gray-600">
                          {application.personalInfo.livingArrangement
                            .charAt(0)
                            .toUpperCase() +
                            application.personalInfo.livingArrangement.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Questionnaire */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Questionnaire Responses
                  </h3>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Work Schedule
                      </p>
                      <p className="text-gray-600">
                        {application.questionnaire.workSchedule
                          .charAt(0)
                          .toUpperCase() +
                          application.questionnaire.workSchedule.slice(1)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Experience with Pets
                      </p>
                      <p className="text-gray-600">
                        {application.questionnaire.experience ||
                          "No experience specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Has Yard
                      </p>
                      <p className="text-gray-600">
                        {application.questionnaire.hasYard ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Other Pets
                      </p>
                      <p className="text-gray-600">
                        {application.questionnaire.hasOtherPets
                          ? application.questionnaire.otherPetsDetails || "Yes"
                          : "No other pets"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                {application.additionalNotes && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Additional Notes
                    </h3>
                    <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">
                      {application.additionalNotes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {application.status === "pending" && (
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    onStatusUpdate(application._id, "rejected");
                    onClose();
                  }}
                  className="px-6 py-2 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
                <button
                  onClick={() => {
                    onStatusUpdate(application._id, "approved");
                    onClose();
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-medium shadow-sm hover:shadow flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsDialog;
