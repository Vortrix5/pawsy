const ApplicationFilters = ({ currentFilter, onFilterChange }) => {
  const getButtonClasses = (id) => {
    const baseClasses = "px-4 py-2 rounded-md transition-colors";
    if (currentFilter === id) {
      switch (id) {
        case "pending":
          return `${baseClasses} bg-yellow-600 text-white`;
        case "approved":
          return `${baseClasses} bg-green-600 text-white`;
        case "rejected":
          return `${baseClasses} bg-red-600 text-white`;
        default:
          return `${baseClasses} bg-gray-600 text-white`;
      }
    }
    return `${baseClasses} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  return (
    <div className="flex space-x-4">
      {filters.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={getButtonClasses(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ApplicationFilters;
