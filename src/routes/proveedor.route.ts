import { Router } from "express";
import { ProveedorController } from "../controllers";
import { ProveedorValidator } from "../validators";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";

const router = Router()
const proveedorValidator = new ProveedorValidator()
const proveedorController = new ProveedorController()

router.get('/', verifyAuthToken, proveedorController.allProveedores)

router.get('/:id_proveedor', verifyAuthToken, proveedorController.oneProveedor)

router.post('/', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), proveedorValidator.validateProveedor, validateFields, proveedorController.createProveedor)

router.put('/:id_proveedor', verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), proveedorValidator.validateProveedor, validateFields, proveedorController.updateProveedor)

router.delete('/:id_proveedor', verifyAuthToken, checkUserRole({ rol: 1 }), proveedorController.deleteProveedor)

export default router;