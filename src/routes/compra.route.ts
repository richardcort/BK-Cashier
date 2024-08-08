import { Router } from "express"
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares"
import { CompraValidator } from "../validators"
import { CompraController } from "../controllers"

const router = Router()
const compraValidator = new CompraValidator()
const compraController = new CompraController()

router.get('/', verifyAuthToken, compraController.getCompras)

router.get('/:id', verifyAuthToken, compraController.getCompra)

router.post('/', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), compraValidator.validateCompra, validateFields, compraController.createCompra)

export default router

