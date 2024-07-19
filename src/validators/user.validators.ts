import { body } from "express-validator";

class UserValidator {
  public validateUser = [
    body("nombre").notEmpty().withMessage("Nombre is required"),
    body("nombre").isString().withMessage("Nombre must be string"),
    body("apellido").notEmpty().withMessage("Apellido is required"),
    body("apellido").isString().withMessage("Apellido must be string"),
    body("usuario").notEmpty().withMessage("usuario is required"),
    body("usuario").isString().withMessage("usuario must be string"),
    body("clave").notEmpty().withMessage("clave is required"),
    body("clave").isString().withMessage("clave must be string"),
    body("rol_id").notEmpty().withMessage("Rol id is required"),
    body("rol_id").isNumeric().withMessage("Rol Id must be numeric"),
  ];

  public validateLogin = [
    body("usuario").notEmpty().withMessage("usuario is required"),
    body("usuario").isString().withMessage("usuario must be string"),
    body("clave").notEmpty().withMessage("clave is required"),
    body("clave").isString().withMessage("clave must be string"),
  ];
}
export { UserValidator };