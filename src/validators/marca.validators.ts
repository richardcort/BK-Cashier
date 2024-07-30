import { body } from "express-validator";

class MarcaValidator {
    public validateMarca = [
        body("codigo_marca").notEmpty().withMessage("Codigo is required"),
        body("codigo_marca").isString().withMessage("Codigo must be string"),
        body("nombre").notEmpty().withMessage("Nombre is required"),
        body("nombre").isString().withMessage("Nombre must be string"),
    ];
}

export { MarcaValidator };