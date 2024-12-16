import { CheckCircle, Clock, XCircle } from "lucide-react";

const StatusBadge = ({ status, withIcon = true }) => {
  const getStatusClasses = () => {
    const baseClasses =
      "px-3 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 transition-all duration-200 shadow-sm";
    switch (status) {
      case "available":
      case "approved":
        return `${baseClasses} bg-green-50 text-green-700 border border-green-200 hover:bg-green-100`;
      case "pending":
        return `${baseClasses} bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100`;
      case "adopted":
        return `${baseClasses} bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100`;
      case "rejected":
        return `${baseClasses} bg-red-50 text-red-700 border border-red-200 hover:bg-red-100`;
      default:
        return `${baseClasses} bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100`;
    }
  };

  const getStatusIcon = () => {
    if (!withIcon) return null;
    const iconClasses = "h-4 w-4";
    switch (status) {
      case "pending":
        return <Clock className={iconClasses} />;
      case "approved":
        return <CheckCircle className={iconClasses} />;
      case "rejected":
        return <XCircle className={iconClasses} />;
      case "adopted":
        return <CheckCircle className={iconClasses} />;
      case "available":
        return <Clock className={iconClasses} />;
      default:
        return null;
    }
  };

  return (
    <span className={getStatusClasses()}>
      {withIcon && getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
