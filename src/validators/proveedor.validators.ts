import { body } from "express-validator";

class ProveedorValidator {
    public validateProveedor = [
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('nombre').isString().withMessage('nombre must be string'),
        body('contacto_principal').notEmpty().withMessage('contacto_principal is required'),
        body('contacto_principal').isString().withMessage('contacto_principal must be string'),
        body('telefono').notEmpty().withMessage('telefono is required'),
        body('telefono').isString().withMessage('telefono must be string'),
        body('correo').notEmpty().withMessage('correo is required'),
        body('correo').isEmail().withMessage('correo must be a valid email'),
        body('direccion').notEmpty().withMessage('direccion is required'),
        body('direccion').isString().withMessage('direccion must be string'),
    ];
}

export { ProveedorValidator }