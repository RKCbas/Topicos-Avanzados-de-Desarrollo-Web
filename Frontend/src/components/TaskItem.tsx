import type { Task } from "../interfaces/Task";

interface Props {
  task: Task;
  onClick: () => void;
}

export default function TaskItem({ task, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: task.completed ? "#f0f0f0" : "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <input
          title="Task Checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={(e) => e.stopPropagation()}
          readOnly
          style={{ cursor: "pointer" }}
        />
        <div style={{ flex: 1 }}>
          <h4
            style={{
              margin: "0 0 4px 0",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.title}
          </h4>
          <p
            style={{
              margin: 0,
              color: "#666",
              fontSize: "14px",
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.description}
          </p>
        </div>
      </div>
    </div>
  );
}