import { Response, Request, NextFunction } from "express";
import cookie from 'cookie'
import { verifyToken } from "../helpers";

// Middleware para verificar el rol del usuario 
export const checkUserRole = (roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const cookies = cookie.parse(req.headers.cookie || '')
        const token = cookies['authToken']

        const user: any = verifyToken(token as string)

        if (user == null) {
            console.log('Token Denied checkUserRole')
            return res.status(401).send('Access Denied');
        }

        const rolesArray = Object.values(roles);

        for (const rol of rolesArray) {
            if (rol == user.rolId) {
                console.log('Authorized access checkUserRole: ' + user.rolName);
                return next();
            }
        }

        console.log('Access Denied checkUserRole')
        return res.status(403).send('You do not have the required role');
    }
}