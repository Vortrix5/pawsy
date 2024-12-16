import { useState, useEffect } from "react";
import { getApplications, updateApplicationStatus } from "../../services/api";
import ApplicationList from "../../components/admin/ApplicationList";
import ApplicationFilters from "../../components/admin/ApplicationFilters";
import Loader from "../../components/shared/Loader";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplications();
      setApplications(response.data);
    } catch (err) {
      setError("Failed to fetch applications");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      fetchApplications();
    } catch (err) {
      setError("Failed to update application status");
      console.error("Error:", err);
    }
  };

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  if (loading) return <Loader />;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Adoption Applications
        </h1>
        <ApplicationFilters currentFilter={filter} onFilterChange={setFilter} />
      </div>

      <ApplicationList
        applications={filteredApplications}
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminApplications;
