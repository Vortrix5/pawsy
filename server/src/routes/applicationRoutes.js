import express from 'express';
import {
  createApplication,
  getApplications,
  getUserApplications,
  getApplicationById,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import { protect, admin } from '../middlewares/auth.js';

const router = express.Router();

router.route('/')
  .post(protect, createApplication)
  .get(protect, admin, getApplications);

router.get('/me', protect, getUserApplications);

router.route('/:id')
  .get(protect, getApplicationById);

router.patch('/:id/status', protect, admin, updateApplicationStatus);

export default router;
