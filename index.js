// app.js o index.js
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/db-conection.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js'; // Importar las rutas de tareas
import cors from 'cors';
import 'dotenv/config';


const app = express();
const port = 3001;

// Conectar a la base de datos
connectDB();

// Middleware de CORS
app.use(cors());

app.use(bodyParser.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de tareas
app.use('/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
