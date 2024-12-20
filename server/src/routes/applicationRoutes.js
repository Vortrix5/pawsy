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

/**
 * @swagger
 * components:
 *   schemas:
 *     Application:
 *       type: object
 *       required:
 *         - petId
 *         - livingArrangement
 *         - occupation
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the application
 *         petId:
 *           type: string
 *           description: The id of the pet
 *         livingArrangement:
 *           type: string
 *           description: The living arrangement of the applicant
 *         occupation:
 *           type: string
 *           description: The occupation of the applicant
 *         hasOtherPets:
 *           type: boolean
 *           description: Whether the applicant has other pets
 *         otherPetsDetails:
 *           type: string
 *           description: Details about other pets
 *         hasYard:
 *           type: boolean
 *           description: Whether the applicant has a yard
 *         workSchedule:
 *           type: string
 *           description: The work schedule of the applicant
 *         experience:
 *           type: string
 *           description: The experience of the applicant with pets
 *         additionalInfo:
 *           type: string
 *           description: Additional information provided by the applicant
 *         status:
 *           type: string
 *           description: The status of the application
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the application was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the application was last updated
 */

/**
 * @swagger
 * /api/applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Application created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       400:
 *         description: Bad request
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 */
router.route('/')
    .post(protect, createApplication)
    .get(protect, admin, getApplications);

/**
 * @swagger
 * /api/applications/me:
 *   get:
 *     summary: Get user applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of user applications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 */
router.get('/me', protect, getUserApplications);

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *     responses:
 *       200:
 *         description: Application data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.route('/:id')
    .get(protect, getApplicationById);

/**
 * @swagger
 * /api/applications/{id}/status:
 *   patch:
 *     summary: Update application status
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status of the application
 *     responses:
 *       200:
 *         description: Application status updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Application'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Application not found
 */
router.patch('/:id/status', protect, admin, updateApplicationStatus);

export default router;