import { body } from "express-validator";

class EmpresaValidator {
    public validateEmpresa = [
        body('rif')
            .notEmpty().withMessage('rif is required')
            .isString().withMessage('rif must be string'),
        body('nombre')
            .notEmpty().withMessage('nombre is required')
            .isString().withMessage('nombre must be string'),
        body('direccion')
            .notEmpty().withMessage('direccion is required')
            .isString().withMessage('direccion must be string'),
    ];
}

export { EmpresaValidator }