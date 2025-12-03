import { useState } from "react";
import type { Task } from "../interfaces/Task";

interface Props {
  task: Task | null;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TaskDetails({ task, onClose, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  // Resetear valores cuando se hace click en editar
  const handleEdit = () => {
    setTitle(task?.title || "");
    setDescription(task?.description || "");
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    if (!task) return;
    await onUpdate(task._id, { title, description });
    setIsEditing(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!task) return;
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await onDelete(task._id);
      onClose();
    }
  };

  const toggleCompleted = async () => {
    if (!task) return;
    await onUpdate(task._id, { completed: !task.completed });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!task) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "24px",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h2 style={{ margin: 0 }}>Detalles de la Tarea</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "0",
              width: "32px",
              height: "32px",
            }}
          >
            ×
          </button>
        </div>

        {isEditing ? (
          <div>
            <input
              title="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
            <textarea
              title="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "12px",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Guardar
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#666",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 style={{ marginTop: 0 }}>{task.title}</h3>
            <p style={{ color: "#666", marginBottom: "16px" }}>{task.description}</p>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={toggleCompleted}
                  style={{ marginRight: "8px" }}
                />
                <span>{task.completed ? "Completada" : "Pendiente"}</span>
              </label>
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button
                onClick={handleEdit}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#2196F3",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Eliminar
              </button>
            </div>

            {task.createdAt && (
              <p style={{ fontSize: "12px", color: "#999", marginTop: "16px" }}>
                Creada: {new Date(task.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}