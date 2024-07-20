import { Router } from "express";
import { validateFields } from "../middlewares";
import { MarcaController } from "../controllers";
import { MarcaValidator } from "../validators/marca.validator";

const marcaValidator = new MarcaValidator();
const router = Router();
const marcaController = new MarcaController();

router.get("/", marcaController.allMarcas);

router.get("/:codigo", marcaController.oneMarca);

router.post("/", marcaValidator.validateMarca, validateFields, marcaController.createMarca);

router.put("/:codigo", marcaValidator.validateMarca, validateFields, marcaController.updateMarca);

router.delete("/:codigo", marcaController.deleteMarca);

export default router;