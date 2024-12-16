import ApplicationCard from "./ApplicationCard";

const ApplicationList = ({ applications, onUpdateStatus }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {applications.map((application) => (
      <ApplicationCard
        key={application.id}
        application={application}
        onStatusUpdate={onUpdateStatus}
      />
    ))}
  </div>
);

export default ApplicationList;
