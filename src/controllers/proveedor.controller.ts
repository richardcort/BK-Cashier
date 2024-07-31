import { Request, Response } from "express";
import { getAll, getOne, update, create, deleted } from "../services/proveedor.service";

export class ProveedorController {
    constructor() {

    }

    allProveedores = async (req: Request, res: Response) => {
        const { message, status, data } = await getAll();

        return res.status(status).json({
            message,
            data
        })
    }

    oneProveedor = async (req: Request, res: Response) => {
        const { id_proveedor } = req.params;
        const { message, data, status } = await getOne(id_proveedor as string);

        return res.status(status).json({
            message,
            data,
        });
    };

    createProveedor = async (req: Request, res: Response) => {
        const { message, data, status } = await create(req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    updateProveedor = async (req: Request, res: Response) => {
        const { id_proveedor } = req.params;
        const { message, status, data } = await update(id_proveedor as string, req.body);

        return res.status(status).json({
            message,
            data,
        });
    };

    deleteProveedor = async (req: Request, res: Response) => {
        const { id_proveedor } = req.params;
        const { message, status, data } = await deleted(id_proveedor as string);

        return res.status(status).json({
            message,
            data,
        });
    };
}