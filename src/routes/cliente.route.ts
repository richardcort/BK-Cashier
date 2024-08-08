import { Router } from "express";
import { ClienteController } from "../controllers";
import { ClienteValidator } from "../validators";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";

const router = Router()
const clienteValidator = new ClienteValidator()
const clienteController = new ClienteController()

router.get('/', verifyAuthToken, clienteController.allClientes)

router.get('/:cedula', verifyAuthToken, clienteController.oneCliente)

router.post('/', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), clienteValidator.validateCliente, validateFields, clienteController.createCliente)

router.put('/:cedula', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), clienteValidator.validateCliente, validateFields, clienteController.updateCliente)

router.delete('/:cedula', verifyAuthToken, checkUserRole({ rol: 1 }), clienteController.deleteCliente)

export default router;
