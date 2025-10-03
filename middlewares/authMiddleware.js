import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import { config } from '../dbconfig.js';

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretosuper");
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Token inválido" });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query("SELECT rol FROM usuario WHERE id = $1", [req.user.id]);
    await client.end();

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!result.rows[0].rol) {
      return res.status(403).json({ message: "Acceso denegado. Solo admins." });
    }

    next();
  } catch (error) {
    await client.end();
    return res.status(500).json({ message: "Error en servidor" });
  }
};
