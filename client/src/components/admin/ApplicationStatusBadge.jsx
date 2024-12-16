import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";

const ApplicationStatusBadge = ({ status }) => {
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

  return (
    <span className="ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center space-x-1">
      {getStatusIcon(status)}
      <span className="ml-1 capitalize">{status}</span>
    </span>
  );
};

export default ApplicationStatusBadge;
