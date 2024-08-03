import { Router } from "express"
import { validateFields } from "../middlewares"
import { CompraValidator } from "../validators"
import { CompraController } from "../controllers"

const router = Router()
const compraValidator = new CompraValidator()
const compraController = new CompraController()

router.get('/', compraController.getCompras)

router.get('/:id', compraController.getCompra)

router.post('/', compraValidator.validateCompra, validateFields, compraController.createCompra)

export default router

