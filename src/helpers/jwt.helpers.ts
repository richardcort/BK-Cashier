import jwt from "jsonwebtoken";

export const generateToken = (data: any) => {
    return jwt.sign(
        {
            user: data.usuario,
            rolId: data.rolId,
            rolName: data.rolName
        },
        process.env.TOKEN_SECRET as string,
        {
            expiresIn: '1h' // Define la expiración del token aquí (por ejemplo, 1 hora)
        })
}

export const verifyToken = (token: string) => {
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET as string)
        return verified
    } catch (error) {
        return null
    }
}