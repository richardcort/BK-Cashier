import { Router } from "express";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";
import { MarcaController } from "../controllers";
import { MarcaValidator } from "../validators";

const marcaValidator = new MarcaValidator();
const router = Router();
const marcaController = new MarcaController();

router.get("/", verifyAuthToken, marcaController.allMarcas);

router.get("/:codigo", verifyAuthToken, marcaController.oneMarca);

router.post("/", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), marcaValidator.validateMarca, validateFields, marcaController.createMarca);

router.put("/:codigo", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), marcaValidator.validateMarca, validateFields, marcaController.updateMarca);

router.delete("/:codigo", verifyAuthToken, checkUserRole({ rol: 1 }), marcaController.deleteMarca);

export default router;