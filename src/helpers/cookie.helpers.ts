import { serialize } from "cookie";
import { Response } from "express";

export const setTokenCookie = (res: Response, token: string) => {
    const serialized = serialize('auth-token', token, { 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
}

