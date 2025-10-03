import { registrarEscuchaService } from '../services/escuchaService.js';

export const registrarEscucha = async (req, res) => {
  try {
    const { id } = req.body; // id de la canción
    const usuarioId = req.user.id; // viene del token (verifyToken)

    if (!id) {
      return res.status(400).json({ message: 'El id de la canción es requerido' });
    }

    const escucha = await registrarEscuchaService({ 
      usuarioId, 
      cancionId: id 
    });

    res.status(201).json(escucha);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error registrando escucha: ' + error.message 
    });
  }
};
