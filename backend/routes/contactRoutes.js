import express from 'express';
import { body } from 'express-validator';
import {
  getContacts,
  createContact,
  getContactById,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// Validation middleware for contact creation
const contactValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),

  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),

  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),

  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number')
];

// Routes
router.get('/', getContacts);
router.post('/', contactValidation, createContact);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);

export default router;
