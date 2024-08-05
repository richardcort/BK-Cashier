import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";

export const generateToken  = (data: UserInterface) => {
    return jwt.sign({
        exp: 60 * 60,
        user: data.usuario,
        password: data.clave
    },
    process.env.TOKEN_SECRET as string)
}