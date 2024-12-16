import { Ruler, Palette, Stethoscope, User2, Home } from "lucide-react";

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-4 rounded-xl">
    <div className="flex items-center gap-2 text-gray-600 mb-1">
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </div>
    <p className="text-gray-900">{value}</p>
  </div>
);

const PetDetailsList = ({ details }) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
      <Stethoscope size={24} />
      Medical & Physical Details
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <DetailItem icon={User2} label="Gender" value={details.gender} />
      <DetailItem icon={Ruler} label="Size" value={details.size} />
      <DetailItem icon={Palette} label="Color" value={details.color} />
      <DetailItem icon={Stethoscope} label="Health" value={details.health} />
      <DetailItem
        icon={Home}
        label="House Trained"
        value={details.houseTrained}
      />
    </div>
  </div>
);

export default PetDetailsList;
