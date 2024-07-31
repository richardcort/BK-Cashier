import { Request, Response } from "express";
import { getAll, getOne, update } from "../services/inventario.service"

export class ProductoInventarioController {
    constructor() {

    }

    allProductosInventario = async (req: Request, res: Response) => {
        const { message, data, status } = await getAll();

        return res.status(status).json({
            message,
            data,
        })
    };

    oneProductoInventario = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, data, status } = await getOne(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    };

    updateProductoInventario = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, status, data } = await update(codigo as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };
}