import { PenSquare, Trash2 } from "lucide-react";
import StatusBadge from "../shared/StatusBadge";

const API_URL = import.meta.env.VITE_API_URL;

const PetList = ({ pets, onEdit, onDelete }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Pet
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Breed
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Age
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="relative px-6 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {pets.map((pet) => (
          <tr key={pet._id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={`${API_URL}/${pet.image}`}
                    alt={pet.name}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {pet.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {pet.species.charAt(0).toUpperCase() + pet.species.slice(1)}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{pet.breed}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{pet.age}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <StatusBadge status={pet.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onEdit(pet)}
                className="text-primary hover:text-primary/80 inline-flex items-center gap-1"
              >
                <PenSquare className="h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => onDelete(pet._id)}
                className="ml-4 text-red-600 hover:text-red-800 inline-flex items-center gap-1"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PetList;
