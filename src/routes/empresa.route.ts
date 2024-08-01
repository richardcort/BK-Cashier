import { Router } from "express";
import { EmpresaController } from "../controllers";
import { EmpresaValidator } from "../validators";
import { validateFields } from "../middlewares";

const router = Router()
const empresaValidator = new EmpresaValidator()
const empresaController = new EmpresaController()

router.get('/', empresaController.oneEmpresa)

router.post('/', empresaValidator.validateEmpresa, validateFields, empresaController.createEmpresa)

router.put('/:rif', empresaValidator.validateEmpresa, validateFields, empresaController.updateEmpresa)


export default router;
