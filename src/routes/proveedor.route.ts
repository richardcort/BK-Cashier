import { Router } from "express";
import { ProveedorController } from "../controllers";
import { ProveedorValidator } from "../validators";
import { validateFields } from "../middlewares";

const router = Router()
const proveedorValidator = new ProveedorValidator()
const proveedorController = new ProveedorController()

router.get('/', proveedorController.allProveedores)

router.get('/:id_proveedor', proveedorController.oneProveedor)

router.post('/', proveedorValidator.validateProveedor, validateFields, proveedorController.createProveedor)

router.put('/:id_proveedor', proveedorValidator.validateProveedor, validateFields, proveedorController.updateProveedor)

router.delete('/:id_proveedor', proveedorController.deleteProveedor)

export default router;