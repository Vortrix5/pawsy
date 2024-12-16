import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const PetCard = ({ pet }) => (
  <Link
    to={`/pets/${pet._id}`}
    className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="aspect-square relative overflow-hidden rounded-t-lg">
      <img
        src={`${API_URL}/${pet.image}`}
        alt={pet.name}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
      />
    </div>

    <div className="p-4 space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold">{pet.name}</h3>
        <span className="text-sm text-gray-500">{pet.age}</span>
      </div>
      <p className="text-gray-600">{pet.breed}</p>
      <p className="text-gray-500 line-clamp-2">{pet.description}</p>
    </div>
  </Link>
);

export default PetCard;
