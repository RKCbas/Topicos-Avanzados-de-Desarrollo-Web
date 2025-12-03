import { useState } from "react";
import type { Task } from "../interfaces/Task";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskDetails from "../components/TaskDetails";
import Loader from "../components/Loader";
import ErrorBanner from "../components/ErrorBanner";
import SuccessNotification from "../components/SuccessNotification";
import { useTasks } from "../hooks/useTasks";

export default function HomePage() {
  const { 
    tasks, 
    selectedTask, 
    loading, 
    error, 
    createTask, 
    updateTask, 
    deleteTask, 
    setSelectedTask 
  } = useTasks();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleCreate = async (data: { title: string; description: string }) => {
    await createTask(data);
    setSuccessMessage("✓ Tarea creada con éxito");
  };

  const handleUpdate = async (id: string, data: Partial<Task>) => {
    await updateTask(id, data);
    setSuccessMessage("✓ Tarea actualizada");
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setSuccessMessage("✓ Tarea eliminada");
  };

  return (
    <div style={{
      padding: "20px",
      maxWidth: "600px",
      margin: "0 auto",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <h1 style={{ marginBottom: "24px", color: "#333" }}>📝 Lista de Tareas</h1>

      {loading && <Loader />}
      {error && <ErrorBanner message={error} />}
      {successMessage && (
        <SuccessNotification 
          message={successMessage} 
          onClose={() => setSuccessMessage(null)} 
        />
      )}

      <TaskForm onSubmit={handleCreate} />

      <TaskList tasks={tasks} onTaskClick={setSelectedTask} />

      <TaskDetails
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}