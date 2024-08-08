import { Router } from "express";
import { VentaController } from "../controllers";
import { VentaValidator } from "../validators";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";

const router = Router()
const ventaValidator = new VentaValidator()
const ventaController = new VentaController()

router.get('/', verifyAuthToken, ventaController.getVentas)

router.get('/:id', verifyAuthToken, ventaController.getCompra)

router.post('/', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), ventaValidator.validateVenta, validateFields, ventaController.createVenta)

export default router