import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPetById, createApplication } from "../services/api";
import FormSection from "../components/forms/FormSection";
import InputField from "../components/forms/InputField";
import SelectField from "../components/forms/SelectField";
import TextArea from "../components/forms/TextArea";
import { Home, Users, Briefcase, Heart, PawPrint } from "lucide-react";
import Loader from "../components/shared/Loader";

const AdoptionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    petId: id,
    occupation: "",
    livingArrangement: "house",
    hasOtherPets: false,
    otherPetsDetails: "",
    hasYard: false,
    workSchedule: "full-time",
    experience: "",
    additionalInfo: "",
    status: "pending",
  });

  useEffect(() => {
    fetchPetDetails();
  }, [id]);

  const fetchPetDetails = async () => {
    try {
      const response = await getPetById(id);
      setPet(response.data);
      if (response.data.status !== "available") {
        setError("This pet is no longer available for adoption.");
      }
    } catch (err) {
      setError("Failed to fetch pet details. Please try again later.");
      console.error("Error fetching pet details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.experience ||
      !formData.livingArrangement ||
      !formData.workSchedule
    ) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setSubmitting(true);
      await createApplication(formData);
      navigate("/applications/me", {
        state: { message: "Application submitted successfully!" },
      });
    } catch (err) {
      setError("Failed to submit application. Please try again later.");
      console.error("Error submitting application:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/pets")}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          Back to Pets
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Adoption Application</h1>
        {pet && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold">Applying to adopt:</h2>
            <p className="text-gray-600">
              {pet.name} - {pet.breed}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Living Situation" icon={Home}>
            <SelectField
              label="Living Arrangement"
              name="livingArrangement"
              value={formData.livingArrangement}
              onChange={handleChange}
              required
              options={[
                { value: "house", label: "House" },
                { value: "apartment", label: "Apartment" },
                { value: "condo", label: "Condo" },
                { value: "other", label: "Other" },
              ]}
              icon={Home}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hasYard"
                checked={formData.hasYard}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label>Do you have a yard?</label>
            </div>
          </FormSection>

          <FormSection title="Household Members" icon={Users}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="hasOtherPets"
                  checked={formData.hasOtherPets}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label>Do you have other pets?</label>
              </div>
              {formData.hasOtherPets && (
                <TextArea
                  label="Tell us about your other pets"
                  name="otherPetsDetails"
                  value={formData.otherPetsDetails}
                  onChange={handleChange}
                  placeholder="Species, age, temperament, etc."
                  rows={3}
                  icon={Users}
                />
              )}
            </div>
          </FormSection>

          <FormSection title="Work & Experience" icon={Briefcase}>
            <InputField
              label="Occupation"
              name="occupation"
              placeholder="Enter your occupation"
              required
              value={formData.occupation}
              onChange={handleChange}
              icon={Briefcase}
            />
            <SelectField
              label="Work Schedule"
              name="workSchedule"
              value={formData.workSchedule}
              onChange={handleChange}
              required
              options={[
                { value: "full-time", label: "Full-time" },
                { value: "part-time", label: "Part-time" },
                { value: "remote", label: "Remote" },
                { value: "flexible", label: "Flexible" },
                { value: "other", label: "Other" },
              ]}
              icon={Briefcase}
            />
            <TextArea
              label="Pet Care Experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              placeholder="Tell us about your experience with pets..."
              rows={4}
              icon={PawPrint}
            />
          </FormSection>

          <FormSection title="Additional Information" icon={Heart}>
            <TextArea
              label="Anything else you'd like us to know?"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Share any additional information that might be relevant..."
              rows={4}
              icon={Heart}
            />
          </FormSection>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;
