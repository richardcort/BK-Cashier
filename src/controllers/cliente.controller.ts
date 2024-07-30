import { getAll, getOne, update, create, deleted } from "../services/cliente.service";
import { Response, Request } from "express";

export class ClienteController {
    constructor() {

    }

    allClientes = async (req: Request, res: Response) => {
        const { message, status, data } = await getAll();

        return res.status(status).json({
            message,
            data
        })
    }

    oneCliente = async (req: Request, res: Response) => {
        const { cedula } = req.params;
        const { message, data, status } = await getOne(cedula as string);

        return res.status(status).json({
            message,
            data,
        });
    };

    createCliente = async (req: Request, res: Response) => {
        const { message, data, status } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    updateCliente = async (req: Request, res: Response) => {
        const { cedula } = req.params;
        const { message, status, data } = await update(cedula as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    deleteCliente = async (req: Request, res: Response) => {
        const { cedula } = req.params;
        const { message, status, data } = await deleted(cedula as string);

        return res.status(status).json({
            message,
            data,
        });
    };
}