import { Router } from "express";
import { validateFields } from "../middlewares";
import { CategoriaValidator } from "../validators";
import { CategoriaController } from "../controllers";

const router = Router();
const categoriaController = new CategoriaController();
const categoriaValidator = new CategoriaValidator();

router.get("/", categoriaController.allCategorias);

router.get("/:codigo", categoriaController.getCategoria);

router.post("/", categoriaValidator.validateCategoria, validateFields, categoriaController.createCategoria);

router.put("/:codigo", categoriaValidator.validateCategoria, validateFields, categoriaController.updateCategoria);

router.delete("/:codigo", categoriaController.deleteCategoria);

export default router;