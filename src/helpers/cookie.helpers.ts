import { serialize } from "cookie";
import { Response } from "express";

export const setTokenCookie = (res: Response, token: string) => {
    const serialized = serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
}

export const clearTokenCookie = (res: Response) => {
    const serialized = serialize('authToken', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
}
