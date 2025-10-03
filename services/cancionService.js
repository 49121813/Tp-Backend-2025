import { Client } from 'pg';
import { config } from '../dbconfig.js';

export const getCancionesService = async () => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query('SELECT * FROM cancion ORDER BY id');
    return result.rows;
  } catch (err) {
    console.error('Error obteniendo canciones:', err);
    throw err;
  } finally {
    await client.end();
  }
};

export const getCancionByIdService = async (id) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query('SELECT * FROM cancion WHERE id = $1', [id]);
    
    if (result.rowCount === 0) {
      throw new Error('Canción no encontrada');
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error obteniendo canción:', err);
    throw err;
  } finally {
    await client.end();
  }
};

export const createCancionService = async ({ nombre }) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query(
      'INSERT INTO cancion (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    
    return result.rows[0];
  } catch (err) {
    console.error('Error creando canción:', err);
    throw err;
  } finally {
    await client.end();
  }
};

export const updateCancionService = async (id, { nombre }) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query(
      'UPDATE cancion SET nombre = $1 WHERE id = $2 RETURNING *',
      [nombre, id]
    );
    
    if (result.rowCount === 0) {
      throw new Error('Canción no encontrada');
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error actualizando canción:', err);
    throw err;
  } finally {
    await client.end();
  }
};

export const deleteCancionService = async (id) => {
  const client = new Client(config);
  await client.connect();

  try {
    const result = await client.query(
      'DELETE FROM cancion WHERE id = $1 RETURNING *',
      [id]
    );
    
    if (result.rowCount === 0) {
      throw new Error('Canción no encontrada');
    }
    
    return result.rows[0];
  } catch (err) {
    console.error('Error eliminando canción:', err);
    throw err;
  } finally {
    await client.end();
  }
};
