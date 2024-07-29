import { body } from "express-validator";

class ProductoValidator {
    public validateProducto = [
        body('codigo_producto').notEmpty().withMessage('codigo_producto is required'),
        body('codigo_producto').isString().withMessage('codigo_producto must be string'),
        body('nombre').notEmpty().withMessage('nombre is required'),
        body('nombre').isString().withMessage('nombre must be string'),
        body('precio').isDecimal().withMessage('precio must be a decimal value'),
        body('marca_codigo').notEmpty().withMessage('marca_codigo is required'),
        body('codigo_categoria').notEmpty().withMessage('codigo_categoria is required'),
    ];
}

export { ProductoValidator };