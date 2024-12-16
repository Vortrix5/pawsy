import asyncHandler from "express-async-handler";
import Application from "../models/Application.js";
import Pet from "../models/Pet.js";

export const createApplication = asyncHandler(async (req, res) => {
  const {
    petId,
    livingArrangement,
    occupation,
    hasOtherPets,
    otherPetsDetails,
    hasYard,
    workSchedule,
    experience,
    additionalInfo,
    ...otherData
  } = req.body;

  const pet = await Pet.findById(petId);
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  if (pet.status !== "available") {
    res.status(400);
    throw new Error("Pet is not available for adoption");
  }

  const existingApplication = await Application.findOne({
    pet: petId,
    applicant: req.user._id,
    status: { $in: ["pending", "approved"] },
  });

  if (existingApplication) {
    res.status(400);
    throw new Error("You already have an active application for this pet");
  }

  const application = await Application.create({
    pet: petId,
    applicant: req.user._id,
    personalInfo: {
      occupation,
      livingArrangement,
    },
    questionnaire: {
      hasOtherPets,
      otherPetsDetails,
      hasYard,
      workSchedule,
      experience,
    },
    additionalNotes: additionalInfo,
    ...otherData,
  });

  await Pet.findByIdAndUpdate(petId, { status: "pending" });

  res.status(201).json(application);
});

export const getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find()
    .populate("pet")
    .populate("applicant", "email name");
  res.json(applications);
});

export const getUserApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ applicant: req.user._id })
    .populate("pet")
    .populate("applicant", "email name");
  res.json(applications);
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id)
    .populate("pet")
    .populate("applicant", "email name");

  if (application) {
    if (
      req.user.role === "admin" ||
      application.applicant._id.equals(req.user._id)
    ) {
      res.json(application);
    } else {
      res.status(403);
      throw new Error("Not authorized to view this application");
    }
  } else {
    res.status(404);
    throw new Error("Application not found");
  }
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const application = await Application.findById(id);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  application.status = status;
  await application.save();

  const pet = await Pet.findById(application.pet);
  if (pet) {
    if (status === "approved") {
      pet.status = "adopted";
      await Application.updateMany(
        {
          pet: pet._id,
          _id: { $ne: id },
          status: "pending",
        },
        { status: "rejected" }
      );
    } else if (status === "rejected") {
      const otherPendingApplications = await Application.findOne({
        pet: pet._id,
        _id: { $ne: id },
        status: "pending",
      });

      if (!otherPendingApplications) {
        pet.status = "available";
      }
    }
    await pet.save();
  }

  res.json(application);
});
