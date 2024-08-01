import { Request, Response } from "express";
import { getOne, create, update } from "../services/empresa.service"

export class EmpresaController {
    constructor() {

    }

    createEmpresa = async (req: Request, res: Response) => {
        const { status, message, data } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    oneEmpresa = async (req: Request, res: Response) => {
        const { message, data, status } = await getOne();

        return res.status(status).json({
            message,
            data,
        });
    };

    updateEmpresa = async (req: Request, res: Response) => {
        const { rif } = req.params;
        const { message, status, data } = await update(rif as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };
}