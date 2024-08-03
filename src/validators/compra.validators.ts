import { body } from "express-validator";

class CompraValidator {

    public validateCompra = [
        body('id_proveedor').notEmpty().withMessage('id_proveedor is required'),
        body('id_proveedor').isString().withMessage('id_proveedor must be string'),

        body('detallesCompra').isArray({ min: 1 }).withMessage('detallesCompra must be an array with at least one element.'),
        body('detallesCompra.*.codigo_producto').notEmpty().withMessage('The codigo_producto is required in each detail.'),
        body('detallesCompra.*.codigo_producto').isString().withMessage('The codigo_producto must be string'),
        body('detallesCompra.*.cantidad').isInt({ gt: 0 }).withMessage('The cantidad must be an integer greater than 0 in each detail.'),
    ]
}

export { CompraValidator };