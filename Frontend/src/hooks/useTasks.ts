import { useState, useEffect } from "react";
import type { Task } from "../interfaces/Task";
import { api } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener todas las tareas
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get<Task[]>("/tasks");
      setTasks(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  };

  // Crear una tarea
  const createTask = async (newTask: { title: string; description: string }) => {
    try {
      setLoading(true);
      await api.post("/tasks", newTask);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Error al crear la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Obtener una sola tarea
  const getTaskById = async (id: string) => {
    try {
      setLoading(true);
      const res = await api.get<Task>(`/tasks/${id}`);
      setSelectedTask(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo obtener la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar una tarea
  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      setLoading(true);
      await api.put(`/tasks/${id}`, data);
      await fetchTasks();
      // Actualizar también la tarea seleccionada si es la misma
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask({ ...selectedTask, ...data });
      }
    } catch (err) {
      console.error(err);
      setError("Error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una tarea
  const deleteTask = async (id: string) => {
    try {
      setLoading(true);
      await api.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Cargar tareas al inicio
  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    selectedTask,
    loading,
    error,
    fetchTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask,
    setSelectedTask,
  };
};