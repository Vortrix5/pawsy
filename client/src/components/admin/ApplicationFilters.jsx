const ApplicationFilters = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { id: "all", label: "All", color: "primary" },
    { id: "pending", label: "Pending", color: "yellow" },
    { id: "approved", label: "Approved", color: "green" },
    { id: "rejected", label: "Rejected", color: "red" },
  ];

  return (
    <div className="flex space-x-4">
      {filters.map(({ id, label, color }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`px-4 py-2 rounded-md ${
            currentFilter === id
              ? `bg-${color}-${color === "primary" ? "600" : "500"} text-white`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ApplicationFilters;
