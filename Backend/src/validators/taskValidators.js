// validators/task.validators.js
import { body, param } from "express-validator";

/* ------------------------------ ID Validator (MongoDB) ------------------------------ */
export const taskIdValidator = [
  param("id")
    .exists().withMessage("El parámetro id es obligatorio")
    .isMongoId().withMessage("El id debe ser un ObjectId válido"),
];

/* ------------------------------ Crear Task ------------------------------ */
export const createTaskValidator = [
  body("title")
    .exists().withMessage("El título es obligatorio")
    .isString().withMessage("El título debe ser texto")
    .notEmpty().withMessage("El título no puede estar vacío"),

  body("description")
    .optional()
    .isString().withMessage("La descripción debe ser texto"),
];

/* ------------------------------ Actualizar Task ------------------------------ */
export const updateTaskValidator = [
  body("title")
    .optional()
    .isString().withMessage("El título debe ser texto"),

  body("description")
    .optional()
    .isString().withMessage("La descripción debe ser texto"),

  body("completed")
    .optional()
    .isBoolean().withMessage("El estado completed debe ser true o false"),
];
