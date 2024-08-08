import { Router } from "express";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";
import { CategoriaValidator } from "../validators";
import { CategoriaController } from "../controllers";

const router = Router();
const categoriaController = new CategoriaController();
const categoriaValidator = new CategoriaValidator();

router.get("/", verifyAuthToken, categoriaController.allCategorias);

router.get("/:codigo", verifyAuthToken, categoriaController.getCategoria);

router.post("/", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), categoriaValidator.validateCategoria, validateFields, categoriaController.createCategoria);

router.put("/:codigo", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2 }), categoriaValidator.validateCategoria, validateFields, categoriaController.updateCategoria);

router.delete("/:codigo", verifyAuthToken, checkUserRole({ rol: 1 }), categoriaController.deleteCategoria);

export default router;