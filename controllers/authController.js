// authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Task from "../models/Task.js"; // Ajusta la ruta según tu estructura
import config from "../config/config.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// authController.js
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Buscar las tareas del usuario
    const tasks = await Task.find({ userId: user._id });

    // Generar token JWT con userId y tareas
    const payload = {
      userId: user._id,
      username: user.username,
      tasks: tasks || [], // Incluimos las tareas o un arreglo vacío si no hay tareas
    };

    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "1h" });
    console.log("Token firmado:", token);

    // Decodificar el token para imprimirlo
    const decodedToken = jwt.decode(token);
    console.log("Token decodificado:", decodedToken);

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};




export const logoutUser = (req, res) => {
  // Puedes realizar acciones adicionales antes de eliminar el token del cliente
  // o simplemente eliminar el token y enviar una respuesta
  try {
    // Eliminar el token del cliente (localStorage, cookies, etc.)
    // Esto es importante para asegurarse de que el usuario esté realmente desconectado
    res.clearCookie("token"); // Por ejemplo, si estás utilizando cookies

    res.status(200).json({ message: "Sesión cerrada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
