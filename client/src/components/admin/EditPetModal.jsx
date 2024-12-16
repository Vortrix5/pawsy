import { useState, useEffect } from "react";
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
  Dog,
} from "lucide-react";
import FormSection from "../forms/FormSection";
import InputField from "../forms/InputField";
import SelectField from "../forms/SelectField";
import TextArea from "../forms/TextArea";

const EditPetModal = ({ isOpen, onClose, onSubmit, pet }) => {
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

  useEffect(() => {
    if (pet) {
      setFormData(pet);
    }
  }, [pet]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Edit Pet</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection icon={UserRound} title="Basic Information">
              <InputField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                icon={UserRound}
              />
              <InputField
                label="Breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                icon={Dog}
                required
              />
              <InputField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                icon={Calendar}
                required
              />
            </FormSection>

            <FormSection icon={Info} title="Details">
              <SelectField
                label="Gender"
                name="details.gender"
                value={formData.details.gender}
                onChange={handleChange}
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                icon={UserRound}
              />
              <SelectField
                label="Size"
                name="details.size"
                value={formData.details.size}
                onChange={handleChange}
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
                icon={Palette}
              />
            </FormSection>

            <FormSection icon={MapPin} title="Location">
              <InputField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                icon={MapPin}
              />
            </FormSection>

            <FormSection icon={Image} title="Image">
              <InputField
                type="file"
                label="Pet Image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                icon={Image}
              />
            </FormSection>

            <FormSection icon={Heart} title="Status">
              <SelectField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: "available", label: "Available" },
                  { value: "pending", label: "Pending" },
                  { value: "adopted", label: "Adopted" },
                ]}
                icon={Heart}
              />
            </FormSection>

            <FormSection icon={Info} title="Description">
              <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                icon={Info}
              />
            </FormSection>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPetModal;
