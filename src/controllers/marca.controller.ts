import { Request, Response } from "express";
import { deleted, create, getAll, getOne, update } from "../services/marca.service";


export class MarcaController {
    constructor() { }

    allMarcas = async (req: Request, res: Response) => {
        const { status, message, data } = await getAll();

        return res.status(status).json({
            message,
            data,
        });
    };

    oneMarca = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { status, message, data } = await getOne(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    };

    createMarca = async (req: Request, res: Response) => {
        const { status, message, data } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    updateMarca = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { status, message, data } = await update(codigo as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    deleteMarca = async (req: Request, res: Response) => {
        const { codigo } = req.params;
        const { status, message, data } = await deleted(codigo as string);

        return res.status(status).json({
            message,
            data,
        });
    };
}