import { Response, Request, NextFunction } from "express";
import cookie from 'cookie'
import { verifyToken } from "../helpers";
import { TokenPayload } from "../interfaces";

// Middleware para verificar la autenticación del token
export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies['authToken']

    if (!token) {
        console.log('Token Denied verifyAuthToken')
        return res.status(401).send('Access Denied')
    }

    try {
        const verified = verifyToken(token) as TokenPayload
        req.user = verified

        console.log('Authorized access verifyAuthToken')
        return next()
        
    } catch (error) {
        console.error('Invalid token', error);
        return res.status(401).send('Invalid token');
    }
}
