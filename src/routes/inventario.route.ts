import { Router } from "express";
import { ProductoInventarioController } from "../controllers";
import { InventarioValidator } from "../validators";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";

const router = Router()
const inventarioValidator = new InventarioValidator()
const productoInventarioController = new ProductoInventarioController()

router.get('/', verifyAuthToken, productoInventarioController.allProductosInventario)

router.get('/:codigo', verifyAuthToken, productoInventarioController.oneProductoInventario)

router.put('/:codigo', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), inventarioValidator.validateInventario, validateFields, productoInventarioController.updateProductoInventario)

export default router;
