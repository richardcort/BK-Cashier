import { body } from "express-validator";

class VentaValidator {

    public validateVenta = [
        body('cedula_cliente').notEmpty().withMessage('cedula_cliente is required'),
        body('cedula_cliente').isString().withMessage('cedula_cliente must be string'),

        body('detallesVenta').isArray({ min: 1 }).withMessage('detallesCompra must be an array with at least one element.'),
        body('detallesVenta.*.codigo_producto').notEmpty().withMessage('The codigo_producto is required in each detail.'),
        body('detallesVenta.*.codigo_producto').isString().withMessage('The codigo_producto must be string'),
        body('detallesVenta.*.cantidad').isInt({ gt: 0 }).withMessage('The cantidad must be an integer greater than 0 in each detail.'),
    ]
}

export { VentaValidator };