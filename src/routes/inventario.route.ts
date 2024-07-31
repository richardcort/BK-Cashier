import { Router } from "express";
import { ProductoInventarioController } from "../controllers";
import { InventarioValidator } from "../validators";
import { validateFields } from "../middlewares";

const router = Router()
const inventarioValidator = new InventarioValidator()
const productoInventarioController = new ProductoInventarioController()

router.get('/', productoInventarioController.allProductosInventario)

router.get('/:codigo', productoInventarioController.oneProductoInventario)

router.put('/:codigo', inventarioValidator.validateInventario, validateFields, productoInventarioController.updateProductoInventario)

export default router;
