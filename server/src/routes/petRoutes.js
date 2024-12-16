import express from 'express';
import {
  createPet,
  getPets,
  getPetById,
  updatePet,
  deletePet,
  updatePetStatus,
} from '../controllers/petController.js';
import { protect, admin } from '../middlewares/auth.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.route('/')
  .get(getPets)
  .post(protect, admin, upload.single('image'), createPet);

router.route('/:id')
  .get(getPetById)
  .put(protect, admin, upload.single('image'), updatePet)
  .delete(protect, admin, deletePet);

router.patch('/:id/status', protect, admin, updatePetStatus);

export default router;
