import { body } from "express-validator";

class ClienteValidator {
    public validateCliente = [
        body('cedula').notEmpty().withMessage('cedula is required'),
        body('cedula').isString().withMessage('cedula must be string'),
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('nombre').isString().withMessage('nombre must be string'),
        body('apellido').notEmpty().withMessage('apellido is required'),
        body('apellido').isString().withMessage('apellido must be string'),
        body('telefono').isString().withMessage('telefono must be string'),
    ];
}

export { ClienteValidator }
