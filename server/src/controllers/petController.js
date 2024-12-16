import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Pet from "../models/Pet.js";
import Application from "../models/Application.js";
import fs from "fs";
import path from "path";

export const createPet = asyncHandler(async (req, res) => {
  const petData = {
    ...req.body,
    image: req.file.path,
    createdBy: req.user._id,
  };

  const pet = await Pet.create(petData);
  res.status(201).json(pet);
});

export const getPets = asyncHandler(async (req, res) => {
  const { search, status, goodWith } = req.query;

  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { breed: { $regex: search, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (goodWith) {
    query["details.goodWith"] = goodWith;
  }

  const pets = await Pet.find(query).populate("createdBy", "name");
  res.json(pets);
});

export const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id).populate("createdBy", "name");

  if (pet) {
    res.json(pet);
  } else {
    res.status(404);
    throw new Error("Pet not found");
  }
});

export const updatePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    Object.assign(pet, req.body);
    if (req.file) {
      if (pet.image) {
        const oldImagePath = path.join(process.cwd(), pet.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      pet.image = req.file.path;
    }

    const updatedPet = await pet.save();
    res.json(updatedPet);
  } else {
    res.status(404);
    throw new Error("Pet not found");
  }
});

export const deletePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);

  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (pet.image) {
      const imagePath = path.join(process.cwd(), pet.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const applications = await Application.find({ pet: pet._id });

    if (applications.length > 0) {
      await Application.deleteMany({ pet: pet._id });
    }

    await pet.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({
      message: "Pet and all related data removed successfully",
      deletedApplications: applications.length,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
});

export const updatePetStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const pet = await Pet.findById(req.params.id);

  if (pet) {
    pet.status = status;
    const updatedPet = await pet.save();
    res.json(updatedPet);
  } else {
    res.status(404);
    throw new Error("Pet not found");
  }
});
