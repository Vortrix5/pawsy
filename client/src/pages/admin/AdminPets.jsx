import { useState, useEffect } from "react";
import { getPets, deletePet, updatePet, createPet } from "../../services/api";
import AddPetModal from "../../components/admin/AddPetModal";
import EditPetModal from "../../components/admin/EditPetModal";
import PetList from "../../components/admin/PetList";
import Loader from "../../components/shared/Loader";
import { PlusCircle } from "lucide-react";

const AdminPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const response = await getPets();
      setPets(response.data);
    } catch (err) {
      setError("Failed to fetch pets. Please try again.");
      console.error("Error fetching pets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPet = async (petData) => {
    try {
      await createPet(petData);
      await fetchPets();
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding pet:", err);
    }
  };

  const handleEditPet = async (petData) => {
    try {
      await updatePet(selectedPet._id, petData);
      await fetchPets();
      setIsEditModalOpen(false);
      setSelectedPet(null);
    } catch (err) {
      console.error("Error updating pet:", err);
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm("Are you sure you want to delete this pet?")) {
      try {
        await deletePet(petId);
        setPets(pets.filter((pet) => pet._id !== petId));
      } catch (err) {
        console.error("Error deleting pet:", err);
      }
    }
  };

  const openEditModal = (pet) => {
    setSelectedPet(pet);
    setIsEditModalOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Pets</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 hover:bg-primary/90"
        >
          <PlusCircle className="w-5 h-5" />
          Add New Pet
        </button>
      </div>

      <PetList pets={pets} onEdit={openEditModal} onDelete={handleDeletePet} />

      <AddPetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPet}
      />

      {selectedPet && (
        <EditPetModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedPet(null);
          }}
          onSubmit={handleEditPet}
          pet={selectedPet}
        />
      )}
    </div>
  );
};

export default AdminPets;
