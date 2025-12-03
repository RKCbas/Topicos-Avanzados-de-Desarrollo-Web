import type { Task } from "../interfaces/Task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export default function TaskList({ tasks, onTaskClick }: Props) {
  // Validar que tasks sea un array
  if (!tasks || !Array.isArray(tasks)) {
    return (
      <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
        Cargando tareas...
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#999", marginTop: "20px" }}>
        No hay tareas. ¡Crea una!
      </p>
    );
  }

  return (
    <div>
      {tasks.map(task => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onClick={() => onTaskClick(task)} 
        />
      ))}
    </div>
  );
}