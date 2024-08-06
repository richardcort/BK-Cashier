import jwt from "jsonwebtoken";
import { UserInterface } from "../interfaces";

export const generateToken = (data: UserInterface) => {
    return jwt.sign(
        {
            user: data.usuario,
            password: data.clave
        },
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: '1h' // Define la expiración del token aquí (por ejemplo, 1 hora)
        })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.TOKEN_SECRET as string)
}