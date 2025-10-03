import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import cancionRoutes from './routes/cancionRoutes.js';
import escuchaRoutes from './routes/escuchaRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/user', userRoutes);
app.use('/cancion', cancionRoutes);
app.use('/escucha', escuchaRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
