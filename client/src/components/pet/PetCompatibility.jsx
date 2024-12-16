import { Heart, Users, Baby, Dog, Cat, PersonStanding } from "lucide-react";

const getCompatibilityIcon = (type) => {
  switch (type.toLowerCase()) {
    case "children":
      return Baby;
    case "dogs":
      return Dog;
    case "cats":
      return Cat;
    case "elderly":
      return PersonStanding;
    default:
      return Users;
  }
};

const CompatibilityItem = ({ type }) => {
  const Icon = getCompatibilityIcon(type);
  return (
    <div className="flex flex-col items-center gap-2 bg-primary/5 px-6 py-4 rounded-xl">
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon size={24} className="text-primary" />
      </div>
      <span className="text-sm font-medium text-gray-700">{type}</span>
    </div>
  );
};

const PetCompatibility = ({ goodWith }) => {
  if (!goodWith || goodWith.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
        <Heart size={24} />
        Great With
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {goodWith.map((item) => (
          <CompatibilityItem key={item} type={item} />
        ))}
      </div>
    </div>
  );
};

export default PetCompatibility;
