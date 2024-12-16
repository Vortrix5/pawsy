import { Search, Filter } from "lucide-react";
import SelectField from "../forms/SelectField";
import InputField from "../forms/InputField";

const PetSearchBar = ({
  searchTerm,
  filterType,
  onSearchChange,
  onFilterChange,
}) => (
  <div className="flex flex-col md:flex-row gap-4">
    <div className="flex-1">
      <InputField
        label=""
        name="search"
        type="text"
        placeholder="Search pets..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        icon={Search}
      />
    </div>

    <div className="w-full md:w-48">
      <SelectField
        label=""
        name="filter"
        options={[
          { value: "all", label: "All Pets" },
          { value: "dog", label: "Dogs" },
          { value: "cat", label: "Cats" },
          { value: "other", label: "Other" },
        ]}
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        icon={Filter}
      />
    </div>
  </div>
);

export default PetSearchBar;
