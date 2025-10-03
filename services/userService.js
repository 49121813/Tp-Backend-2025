import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';
import { config } from '../dbconfig.js';

const JWT_SECRET = process.env.JWT_SECRET || "secretosuper";

export const createUserService = async ({ id, nombre, password, rol }) => {
  const client = new Client(config);
  await client.connect();

  try {
    //  Recibe el password YA hasheado del controller
    const result = await client.query(
      `INSERT INTO usuario (id, nombre, password, rol) 
       VALUES ($1, $2, $3, $4) 
       RETURNING id, nombre, rol`,
      [id, nombre, password, rol] // password ya viene hasheado
    );

    return result.rows[0];
  } catch (err) {
    console.error("Error creando usuario:", err);
    throw err;
  } finally {
    await client.end();
  }
};

export const loginUserService = async ({ id, password }) => {
  if (!id || !password) throw new Error('Faltan datos');

  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query("SELECT * FROM usuario WHERE id = $1", [id]);

    if (result.rowCount === 0) throw new Error('Usuario no encontrado');

    const user = result.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error('Clave inválida');

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, rol: user.rol }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    return { 
      token, 
      user: { 
        id: user.id, 
        nombre: user.nombre, 
        rol: user.rol 
      } 
    };
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};