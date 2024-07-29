import { Request, Response } from "express";
import { getAll, getOne, create, update, deleted } from "../services/producto.service"

export class ProductoController {
    constructor() {

    }

    allProductos = async (req: Request, res: Response) => {
        const { message, data, status } = await getAll();

        return res.status(status).json({
            message,
            data,
        })
    };

    oneProducto = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, data, status } = await getOne(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    };

    createProducto = async (req: Request, res: Response) => {
        const { message, data, status } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    updateProducto = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, status, data } = await update(codigo as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    deleteProducto = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, status, data } = await deleted(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    };
}