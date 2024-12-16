import StatusBadge from "../shared/StatusBadge";
import { User, PawPrint, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import ApplicationDetailsDialog from "./ApplicationDetailsDialog";

const ApplicationCard = ({ application, onStatusUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsDialogOpen(true)}
        className="bg-white rounded-xl shadow-lg p-6 relative hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer hover:scale-[1.02] group"
      >
        <div className="absolute top-6 right-6">
          <StatusBadge status={application.status} withIcon={false} />
        </div>

        <div className="flex gap-6">
          {/* Pet Image */}
          <div className="hidden sm:block w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={`http://localhost:5000/${application.pet.image}`}
              alt={application.pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 pr-16">
            {/* Header Section */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <User className="h-5 w-5 text-gray-400" />
                <h3 className="text-lg font-bold text-gray-900 truncate">
                  {application.applicant.name}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-4 w-4 text-gray-400" />
                  <span className="truncate">{application.pet.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="truncate">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Details Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Living Arrangement
                  </p>
                  <p className="text-sm text-gray-600">
                    {application.personalInfo.livingArrangement
                      .charAt(0)
                      .toUpperCase() +
                      application.personalInfo.livingArrangement.slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Experience
                  </p>
                  <p className="text-sm text-gray-600">
                    {application.questionnaire.experience
                      ? application.questionnaire.experience.length > 25
                        ? application.questionnaire.experience.substring(
                            0,
                            25
                          ) + "..."
                        : application.questionnaire.experience
                      : "No experience specified"}
                  </p>
                </div>
              </div>
            </div>

            {/* View Details Link */}
            <div className="mt-4 flex items-center justify-end">
              <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                View Details
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <ApplicationDetailsDialog
        application={application}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onStatusUpdate={onStatusUpdate}
      />
    </>
  );
};

export default ApplicationCard;
