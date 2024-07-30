import { Router } from "express";
import { ClienteController } from "../controllers";
import { ClienteValidator } from "../validators";
import { validateFields } from "../middlewares";

const router = Router()
const clienteValidator = new ClienteValidator()
const clienteController = new ClienteController()

router.get('/', clienteController.allClientes)

router.get('/:cedula', clienteController.oneCliente)

router.post('/', clienteValidator.validateCliente, validateFields, clienteController.createCliente)

router.put('/:cedula', clienteValidator.validateCliente, validateFields, clienteController.updateCliente)

router.delete('/:cedula', clienteController.deleteCliente)

export default router;
