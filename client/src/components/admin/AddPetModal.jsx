import { useState } from "react";
import {
  X,
  UserRound,
  Info,
  Image,
  MapPin,
  Heart,
  Calendar,
  Ruler,
  Palette,
  Activity,
} from "lucide-react";
import FormSection from "../forms/FormSection";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import TextArea from "../forms/TextArea";

const AddPetModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    species: "dog",
    breed: "",
    age: "",
    location: "",
    description: "",
    image: null,
    status: "available",
    details: {
      gender: "male",
      size: "medium",
      color: "",
      houseTrained: false,
      health: "",
      goodWith: [],
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [section, field] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGoodWithChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      details: {
        ...prev.details,
        goodWith: prev.details.goodWith.includes(value)
          ? prev.details.goodWith.filter((item) => item !== value)
          : [...prev.details.goodWith, value],
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ensure all required fields are filled
    const requiredFields = ['name', 'species', 'breed', 'age', 'location', 'description'];
    const requiredDetails = ['gender', 'size', 'color', 'health'];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    const missingDetails = requiredDetails.filter(field => !formData.details[field]);
    
    if (missingFields.length > 0 || missingDetails.length > 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!formData.image) {
      alert('Please upload a pet image');
      return;
    }
    
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Pet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Basic Information" icon={UserRound}>
            <InputField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Max"
              icon={UserRound}
            />
            <SelectField
              label="Species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
              options={[
                { value: "dog", label: "Dog" },
                { value: "cat", label: "Cat" },
                { value: "other", label: "Other" },
              ]}
              icon={UserRound}
            />
            <InputField
              label="Breed"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              required
              placeholder="e.g., Golden Retriever"
              icon={UserRound}
            />
            <InputField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              placeholder="e.g., 2 years"
              icon={Calendar}
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., San Francisco, CA"
              icon={MapPin}
            />
          </FormSection>

          <FormSection title="Details" icon={Info}>
            <div className="grid grid-cols-2 gap-4">
              <SelectField
                label="Gender"
                name="details.gender"
                value={formData.details.gender}
                onChange={handleChange}
                required
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                icon={Info}
              />
              <SelectField
                label="Size"
                name="details.size"
                value={formData.details.size}
                onChange={handleChange}
                required
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
                icon={Ruler}
              />
              <InputField
                label="Color"
                name="details.color"
                value={formData.details.color}
                onChange={handleChange}
                required
                placeholder="e.g., Golden"
                icon={Palette}
              />
              <InputField
                label="Health"
                name="details.health"
                value={formData.details.health}
                onChange={handleChange}
                required
                placeholder="e.g., Vaccinated, Neutered"
                icon={Activity}
              />
            </div>
          </FormSection>

          <FormSection title="Good With" icon={Heart}>
            <div className="flex flex-wrap gap-2">
              {["Children", "Dogs", "Cats", "Elderly"].map((option) => (
                <label
                  key={option}
                  className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                    formData.details.goodWith.includes(option)
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  <input
                    type="checkbox"
                    value={option}
                    checked={formData.details.goodWith.includes(option)}
                    onChange={handleGoodWithChange}
                    className="sr-only"
                  />
                  {option}
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection title="Description" icon={Info}>
            <TextArea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="e.g., Friendly and energetic dog looking for an active family."
              rows={4}
              icon={Info}
            />
          </FormSection>

          <FormSection title="Image" icon={Image}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Pet Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-medium
                  file:bg-primary/10 file:text-primary
                  hover:file:cursor-pointer hover:file:bg-primary/20
                  focus:outline-none"
              />
            </div>
          </FormSection>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
