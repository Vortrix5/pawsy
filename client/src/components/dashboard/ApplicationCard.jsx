import { Link } from 'react-router-dom'
import StatusBadge from '../shared/StatusBadge'

const ApplicationCard = ({ application }) => (
  <div className="bg-white rounded-lg shadow p-6 space-y-4">
    <div className="flex items-center space-x-4">
      <img
        src={application.pet.image}
        alt={application.pet.name}
        className="h-20 w-20 rounded-lg object-cover"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{application.pet.name}</h3>
        <p className="text-gray-500">{application.pet.breed}</p>
      </div>
    </div>
    <div className="flex justify-between items-center">
      <StatusBadge status={application.status} withIcon />
      <span className="text-sm text-gray-500">Submitted on {application.submittedAt}</span>
    </div>
    <Link
      to={`/pets/${application.pet.id}`}
      className="block text-center px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
    >
      View Pet Details
    </Link>
  </div>
)

export default ApplicationCard
