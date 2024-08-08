import { Router } from "express";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";
import { ProductoController } from "../controllers";
import { ProductoValidator } from "../validators";

const productoValidator = new ProductoValidator();
const router = Router();
const productoController = new ProductoController();

router.get('/', verifyAuthToken, productoController.allProductos);

router.get('/:codigo', verifyAuthToken, productoController.oneProducto);

router.post('/', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), productoValidator.validateProducto, validateFields, productoController.createProducto);

router.put('/:codigo', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), productoValidator.validateProducto, validateFields, productoController.updateProducto);

router.delete('/:codigo', verifyAuthToken, checkUserRole({ rol: 1 }), productoController.deleteProducto);

export default router;