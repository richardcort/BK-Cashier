
import { Router } from "express";
import { validateFields, verifyAuthToken, checkUserRole } from "../middlewares";
import { UserController } from "../controllers";
import { UserValidator } from "../validators";

const userValidator = new UserValidator();
const router = Router();
const userController = new UserController();

router.get("/", verifyAuthToken, userController.allUser);//http://localhost:3800/api/users

router.get("/:id", verifyAuthToken, userController.oneUser);//http://localhost:3800/api/users/1

router.post("/", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2, rol3: 3 }), userValidator.validateUser, validateFields, userController.createUser);//http://localhost:3800/api/users

router.put("/:id", verifyAuthToken, checkUserRole({ rol: 1, rol2: 2}), userValidator.validateUser, validateFields, userController.updateUser);//http://localhost:3800/api/users/1

router.delete("/:id",verifyAuthToken, checkUserRole({ rol: 1}), userController.deleteUser);//http://localhost:3800/api/users/1

router.post("/login", userValidator.validateLogin, validateFields, userController.loginUser);//http://localhost:3800/api/users

router.post('/logout', userController.logout)

export default router;
