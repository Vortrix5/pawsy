import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pet",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    personalInfo: {
      occupation: String,
      livingArrangement: String,
    },
    questionnaire: {
      hasOtherPets: Boolean,
      otherPetsDetails: String,
      hasYard: Boolean,
      workSchedule: String,
      experience: String,
    },
    additionalNotes: String,
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
