// authMiddleware.js
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import  Task  from '../models/Task.js'; // Ajusta la ruta según tu estructura

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  const token = tokenParts[1];

  try {
    const decodedToken = jwt.verify(token, config.jwtSecret);

    if (!decodedToken.userId) {
      return res.status(403).json({ message: 'Acceso denegado, userId no presente en el token' });
    }

    // Buscar las tareas del usuario
    const tasks = await Task.find({ userId: decodedToken.userId });

    if (!tasks) {
      return res.status(404).json({ message: 'Tareas no encontradas para el usuario' });
    }

    // Almacenar las tareas en el objeto de solicitud (req) para su uso posterior
    req.user = { ...decodedToken, tasks };

    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(403).json({ message: 'Acceso denegado, token inválido' });
  }
};
