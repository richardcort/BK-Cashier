import { body } from "express-validator";

class CategoriaValidator {
    public validateCategoria = [
        body("codigo_categoria").notEmpty().withMessage("Codigo is required"),
        body("codigo_categoria").isString().withMessage("Codigo must be string"),
        body("nombre").notEmpty().withMessage("Nombre is required"),
        body("nombre").isString().withMessage("Nombre must be string"),
    ];
}

export { CategoriaValidator };