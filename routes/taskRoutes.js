// routes/taskRoutes.js

import express from 'express';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

// Autenticar todas las rutas de tareas
router.use(authenticateToken);

// Cargar tareas al token antes de llegar a la ruta protegida


// Rutas para tareas
router.post('/create', createTask);
router.get('/all', getAllTasks);
router.patch('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;
