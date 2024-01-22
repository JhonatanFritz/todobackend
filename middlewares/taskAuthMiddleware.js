export const authenticateTaskUser = (req, res, next) => {
  console.log("Usuario:", req.user); // Añade esta línea
  console.log("Tareas del Usuario:", req.user.tasks); // Añade esta línea

  const userId = req.user._id;
  const taskId = req.params.id;

  if (!Array.isArray(req.user.tasks)) {
    console.log("No tienes tareas asignadas");
    return res.status(403).json({ message: "No tienes tareas asignadas" });
  }

  const taskBelongsToUser = req.user.tasks.some((task) => task.equals(taskId));

  if (!taskBelongsToUser) {
    console.log("No tienes permisos para acceder a esta tarea");
    return res
      .status(403)
      .json({ message: "No tienes permisos para acceder a esta tarea" });
  }
  
  next();
};
