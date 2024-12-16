import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const getStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return <ClockIcon className="h-5 w-5 text-yellow-500" />;
    case "approved":
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case "rejected":
      return <XCircleIcon className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const ApplicationCard = ({ application, onStatusUpdate }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="text-lg font-medium text-gray-900">
              {application.applicant.name}
            </h3>
            <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center space-x-1">
              {getStatusIcon(application.status)}
              <span className="ml-1 capitalize">{application.status}</span>
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Pet: {application.pet.name}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Submitted: {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          {application.status === "pending" && (
            <>
              <button
                onClick={() => onStatusUpdate(application._id, "approved")}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Approve
              </button>
              <button
                onClick={() => onStatusUpdate(application._id, "rejected")}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900">Application Details</h4>
        <div className="mt-2 text-sm text-gray-500">
          <p>
            Living Situation:{" "}
            {application.personalInfo.livingArrangement.charAt(0).toUpperCase() +
              application.personalInfo.livingArrangement.slice(1)}
          </p>
          <p>
            Experience:{" "}
            {application.questionnaire.experience || "No experience specified"}
          </p>
          <p>
            Other Pets:{" "}
            {application.questionnaire.hasOtherPets
              ? application.questionnaire.otherPetsDetails || "Yes"
              : "No other pets"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
