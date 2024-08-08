import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayload extends JwtPayload {
    user: string
    rolId: number | string
    rolName: string
}