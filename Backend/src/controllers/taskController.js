// controllers/task.controller.js
import { Task } from "../models/taskModel.js"; 
import { trError } from "../middlewares/error.js";
import { validationResult } from "express-validator";

/* ------------------------------ Crear Task ------------------------------ */
export const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      trError(400, "Datos inválidos", errors.array());
    }

    const { title, description } = req.body;

    const task = await Task.create({ title, description });

    res.status(201).json({ task });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------ Obtener todas ------------------------------ */
export const getTasks = async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks)
  } catch (error) {
    next(error);
  }
};

/* ------------------------------ Obtener por ID ------------------------------ */
export const getTaskById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      trError(400, "Datos inválidos", errors.array());
    }

    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) trError(404, "Task no encontrada");

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------ Actualizar Task ------------------------------ */
export const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      trError(400, "Datos inválidos", errors.array());
    }

    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) trError(404, "Task no encontrada");

    const { title, description, completed } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

/* ------------------------------ Eliminar Task ------------------------------ */
export const deleteTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      trError(400, "Datos inválidos", errors.array());
    }

    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) trError(404, "Task no encontrada");

    await task.deleteOne();

    res.json({ message: "Task eliminada correctamente" });
  } catch (error) {
    next(error);
  }
};
