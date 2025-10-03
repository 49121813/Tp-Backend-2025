import bcrypt from 'bcrypt';
import { createUserService, loginUserService } from '../services/userService.js';

export const createUser = async (req, res) => {
  try {
    const { id, nombre, password, rol } = req.body;

    // Validaciones básicas
    if (!id || !nombre || !password || typeof rol !== "boolean") {
      return res.status(400).json({ message: "Faltan datos o el rol no es booleano" });
    }

    //Hash del password en el controller
    const hashedPassword = await bcrypt.hash(password, 10);

    // Llamada al service con password ya hasheado
    const newUser = await createUserService({ 
      id, 
      nombre, 
      password: hashedPassword, 
      rol 
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario: " + error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const result = await loginUserService(req.body);
    res.json(result); // Devuelve { token, user }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
