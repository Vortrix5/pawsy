import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      enum: ["dog", "cat"],
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    details: {
      gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
      },
      size: {
        type: String,
        enum: ["small", "medium", "large"],
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      houseTrained: {
        type: Boolean,
        default: false,
      },
      health: {
        type: String,
        required: true,
      },
      goodWith: [
        {
          type: String,
          enum: ["Children", "Dogs", "Cats", "Elderly"],
        },
      ],
    },
    status: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
