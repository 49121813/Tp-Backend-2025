// routes/cancionRoutes.js
import express from 'express';
import {
  getCanciones,
  getCancionById,
  createCancion,
  updateCancion,
  deleteCancion
} from '../controllers/cancionController.js';
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// GET todas las canciones
router.get('/', verifyToken, getCanciones);

// GET una canción por ID
router.get('/:id', verifyToken, getCancionById);

// POST crear nueva canción
router.post('/', verifyToken, verifyAdmin, createCancion);

// PUT actualizar canción por ID
router.put('/:id', verifyToken, verifyAdmin, updateCancion);

// DELETE borrar canción por ID
router.delete('/:id', verifyToken, verifyAdmin, deleteCancion);

export default router;
