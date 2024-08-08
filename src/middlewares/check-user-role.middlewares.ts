import { Response, Request, NextFunction } from "express";
import { TokenPayload } from "../interfaces";

// Middleware para verificar el rol del usuario 
export const checkUserRole = (roles: any) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const user = req.user as TokenPayload;

        if (!user || !user.rolId || !user.rolName) {
            console.log('Token Denied checkUserRole');
            return res.status(401).send('Access Denied');
        }

        const rolesArray = Object.values(roles);

        if (rolesArray.includes(user.rolId)) {
            console.log('Authorized access checkUserRole: ' + user.rolName);
            return next();
        }

        console.log('Access Denied checkUserRole')
        return res.status(403).send('You do not have the required role');
    }
}