// controllers/taskController.js

import Task from "../models/Task.js";

// controllers/taskController.js
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // El userId debe estar disponible en req.user si el middleware de autenticación se ha ejecutado previamente
    const userId = req.user.userId;
    console.log("Usuario autenticado:", req.user);

    const newTask = new Task({
      title,
      description,
      userId,
    });

    await newTask.save();

    res.status(201).json({ message: "Tarea creada exitosamente" });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//Función para poder obtener todas las tareas
export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId; // El ID del usuario que ha iniciado sesión

    console.log("ID del Usuario:", userId); // Agrega esta línea para imprimir el ID del usuario

    const tasks = await Task.find({ userId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateTask = async (req, res) => {
  try {
    console.log("Usuario:", req.user);
    console.log("Tareas del Usuario:", req.user.tasks);

    const taskId = req.params.id;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      { title, description, status },
      { new: true }
    );

    if (!updatedTask) {
      console.log("Tarea no encontrada");
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    console.log("Tarea actualizada exitosamente", updatedTask);
    res
      .status(200)
      .json({ message: "Tarea actualizada exitosamente", task: updatedTask });
  } catch (error) {
    console.error("Error interno del servidor", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id; // El ID del usuario que ha iniciado sesión

    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res
      .status(200)
      .json({ message: "Tarea eliminada exitosamente", task: deletedTask });
      console.log("Tarea eliminada ok")
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
