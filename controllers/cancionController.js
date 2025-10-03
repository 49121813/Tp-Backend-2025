import {
  getCancionesService,
  getCancionByIdService,
  createCancionService,
  updateCancionService,
  deleteCancionService
} from '../services/cancionService.js';

export const getCanciones = async (req, res) => {
  try {
    const canciones = await getCancionesService();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo canciones: ' + error.message });
  }
};

export const getCancionById = async (req, res) => {
  try {
    const { id } = req.params;
    const cancion = await getCancionByIdService(id);
    res.json(cancion);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCancion = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const nuevaCancion = await createCancionService({ nombre });
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(500).json({ message: 'Error creando canción: ' + error.message });
  }
};

export const updateCancion = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const cancionActualizada = await updateCancionService(id, { nombre });
    res.json(cancionActualizada);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCancion = async (req, res) => {
  try {
    const { id } = req.params;
    const cancionEliminada = await deleteCancionService(id);
    res.json({ message: 'Canción eliminada', data: cancionEliminada });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};