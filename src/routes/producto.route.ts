import { Router } from "express";
import { validateFields } from "../middlewares";
import { ProductoController } from "../controllers";
import { ProductoValidator } from "../validators";

const productoValidator = new ProductoValidator();
const router = Router();
const productoController = new ProductoController();

router.get('/', productoController.allProductos);

router.get('/:codigo', productoController.oneProducto);

router.post('/', productoValidator.validateProducto, validateFields, productoController.createProducto);

router.put('/:codigo', productoValidator.validateProducto, validateFields, productoController.updateProducto);

router.delete('/:codigo', productoController.deleteProducto);

export default router;