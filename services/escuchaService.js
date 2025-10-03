import { Client } from 'pg';
import { config } from '../dbconfig.js';

export const registrarEscuchaService = async ({ usuarioId, cancionId }) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query(
      `INSERT INTO escucha (user_id, cancion_id, reproduccion) 
       VALUES ($1, $2, 1) 
       RETURNING *`,
      [usuarioId, cancionId]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error registrando escucha:', err);
    throw err;
  } finally {
    await client.end();
  }
};
