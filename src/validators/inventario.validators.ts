import { body } from "express-validator";

class InventarioValidator {
    public validateInventario = [
        body('aviso').isInt({ min: 0 }).withMessage('aviso must be a non-negative integer'),
        body('stock').isInt({ min: 0 }).withMessage('stock must be a non-negative integer'),
    ];
}

export { InventarioValidator }