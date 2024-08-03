import { getAll, create, getOne } from "../services/compra.service";
import { Request, Response } from "express";

export class CompraController {

    getCompras = async (req: Request, res: Response) => {
        const { status, message, data } = await getAll()

        return res.status(status).json({
            message,
            data,
        })
    }

    createCompra = async (req: Request, res: Response) => {
        const { status, message, data } = await create(req.body)

        return res.status(status).json({
            message,
            data,
        });
    }

    getCompra = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status, message, data } = await getOne(parseInt(id) as number)

        return res.status(status).json({
            message,
            data,
        });
    }
}