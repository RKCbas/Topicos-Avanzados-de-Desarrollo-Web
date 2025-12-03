// routes/task.routes.js
import { Router } from "express";
import { createTaskValidator, taskIdValidator, updateTaskValidator } from "../validators/taskValidators.js";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "../controllers/taskController.js";

const taskRouter = Router();

taskRouter.post("/", createTaskValidator, createTask);
taskRouter.get("/", getTasks);
taskRouter.get("/:id", taskIdValidator, getTaskById);
taskRouter.put("/:id", taskIdValidator, updateTaskValidator, updateTask);
taskRouter.delete("/:id", taskIdValidator, deleteTask);

export default taskRouter;
