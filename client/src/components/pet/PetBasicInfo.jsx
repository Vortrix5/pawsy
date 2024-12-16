import { Calendar, MapPin } from "lucide-react";

const PetBasicInfo = ({ name, breed, age, location, description }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-xl text-gray-600">{breed}</p>
    </div>

    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Calendar className="text-primary" />
        <span>{age}</span>
      </div>
      <div className="flex items-center gap-2">
        <MapPin className="text-primary" />
        <span>{location}</span>
      </div>
    </div>

    <p className="text-gray-600">{description}</p>
  </div>
);

export default PetBasicInfo;
