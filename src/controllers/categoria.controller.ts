import { Request, Response } from "express";
import { getAll, getOne, create, update, deleted } from "../services/categoria.service";

export class CategoriaController {
    constructor() { }

    allCategorias = async (req: Request, res: Response) => {
        const { message, status, data } = await getAll();

        return res.status(status).json({
            message,
            data,
        });
    }

    getCategoria = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, status, data } = await getOne(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    }

    createCategoria = async (req: Request, res: Response) => {
        const { status, message, data } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    }

    updateCategoria = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, data, status } = await update(codigo as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    }

    deleteCategoria = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { message, data, status } = await deleted(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    }
}