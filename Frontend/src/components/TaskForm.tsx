import { useState } from "react";
import type { CreateTask } from "../interfaces/Task";

interface Props {
  onSubmit: (task: CreateTask) => void | Promise<void>;
}

export default function TaskForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ marginBottom: "24px" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Título de la tarea"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "8px",
          fontSize: "16px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
        rows={3}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "8px",
          fontSize: "14px",
          border: "1px solid #ddd",
          borderRadius: "4px",
          boxSizing: "border-box",
          resize: "vertical",
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Crear Tarea
      </button>
    </div>
  );
}