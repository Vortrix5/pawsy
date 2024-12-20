import { useState, useEffect, useMemo } from "react";
import { getPets } from "../services/api";
import PetSearchBar from "../components/pet/PetSearchBar";
import PetCard from "../components/pet/PetCard";
import Loader from "../components/shared/Loader";

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await getPets();
      setPets(response.data);
    } catch (err) {
      setError("Failed to fetch pets. Please try again later.");
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        searchTerm.trim() === "" ||
        pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pet.details?.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filterType === "all" || filterType === pet.species.toLowerCase();

      return matchesSearch && matchesFilter && pet.status === "available";
    });
  }, [pets, searchTerm, filterType]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Available Pets
        </h1>
        <PetSearchBar
          searchTerm={searchTerm}
          filterType={filterType}
          onSearchChange={setSearchTerm}
          onFilterChange={setFilterType}
        />
      </div>

      {filteredPets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No pets found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPets.map((pet) => (
            <PetCard pet={pet} key={pet._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetListing;
