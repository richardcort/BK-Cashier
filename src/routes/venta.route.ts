import { Router } from "express";
import { VentaController } from "../controllers";
import { VentaValidator } from "../validators";
import { validateFields } from "../middlewares";

const router = Router()
const ventaValidator = new VentaValidator()
const ventaController = new VentaController()

router.get('/', ventaController.getVentas)

router.get('/:id', ventaController.getCompra)

router.post('/', ventaValidator.validateVenta, validateFields, ventaController.createVenta)

export default router