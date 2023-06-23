import express from 'express';
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } from '../controllers/user.controller';

const router = express.Router();

// Routes publiques
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);

// Routes protégées
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;