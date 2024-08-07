import { Response, Request, NextFunction } from "express";
import cookie from 'cookie'

// Middleware para verificar la autenticación del token
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies['authToken']

    if (!token) {
        console.log('Token Denied verifyAuthToken')
        return res.status(401).send('Access Denied')
    }

    console.log('Authorized access verifyAuthToken')
    next()
}
