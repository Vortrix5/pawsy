import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPetById } from "../services/api";
import { Heart, MapPin, Calendar, Info } from "lucide-react";
import PetBasicInfo from "../components/pet/PetBasicInfo";
import PetDetailsList from "../components/pet/PetDetailsList";
import PetCompatibility from "../components/pet/PetCompatibility";
import PetImageGallery from "../components/pet/PetImageGallery";
import Loader from "../components/shared/Loader";

const PetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const response = await getPetById(id);
      setPet(response.data);
    } catch (err) {
      setError("Failed to fetch pet details. Please try again later.");
      console.error("Error fetching pet details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdoptClick = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/adopt/${id}` } });
    } else {
      navigate(`/adopt/${id}`);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !pet) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error || "Pet not found"}</p>
        <button
          onClick={() => navigate("/pets")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200"
        >
          Back to Pets
        </button>
      </div>
    );
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case "available":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "adopted":
        return "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Image and Quick Info */}
          <div className="p-6">
            <div className="rounded-xl overflow-hidden">
              <PetImageGallery
                image={pet.image}
                name={pet.name}
              />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <MapPin size={18} />
                  <span className="text-sm font-medium">Location</span>
                </div>
                <p className="text-gray-900">{pet.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Age</span>
                </div>
                <p className="text-gray-900">{pet.age}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Pet Details */}
          <div className="p-6 lg:border-l border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {pet.name}
                </h1>
                <p className="text-lg text-gray-600 mb-4">{pet.breed}</p>
                <span
                  className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusStyle(
                    pet.status
                  )}`}
                >
                  {pet.status === "available"
                    ? "Available for Adoption"
                    : pet.status === "pending"
                    ? "Adoption Pending"
                    : "Already Adopted"}
                </span>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 mb-4">
                <Info size={24} className="text-primary" />
                About {pet.name}
              </h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {pet.description}
              </p>
            </div>

            <PetDetailsList
              details={{
                gender:
                  pet.details.gender.charAt(0).toUpperCase() +
                  pet.details.gender.slice(1),
                size:
                  pet.details.size.charAt(0).toUpperCase() +
                  pet.details.size.slice(1),
                color: pet.details.color,
                health: pet.details.health,
                houseTrained: pet.details.houseTrained ? "Yes" : "No",
              }}
            />

            <div className="mt-8">
              <PetCompatibility goodWith={pet.details.goodWith} />
            </div>

            {pet.status === "available" && (
              <div className="mt-8">
                <button
                  onClick={handleAdoptClick}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  <Heart size={20} />
                  Start Adoption Process
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
