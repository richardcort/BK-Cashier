import { Router } from "express";
import { EmpresaController } from "../controllers";
import { EmpresaValidator } from "../validators";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";

const router = Router()
const empresaValidator = new EmpresaValidator()
const empresaController = new EmpresaController()

router.get('/', verifyAuthToken, empresaController.oneEmpresa)

router.post('/', verifyAuthToken, checkUserRole({ rol: 1 }), empresaValidator.validateEmpresa, validateFields, empresaController.createEmpresa)

router.put('/:rif', verifyAuthToken, checkUserRole({ rol: 1 }), empresaValidator.validateEmpresa, validateFields, empresaController.updateEmpresa)


export default router;
