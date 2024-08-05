import { Request, Response } from "express";
import { create, deleted, getAll, getOne, update, getUserAndPassword } from '../services/user.service';
import { generateToken, setTokenCookie } from "../helpers";

export class UserController {
  constructor() { }

  allUser = async (req: Request, res: Response) => {
    const { status, message, data } = await getAll();
    return res.status(status).json({
      message,
      data,
    });
  };

  oneUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await getOne(parseInt(id) as number);
    return res.status(status).json({
      message,
      data,
    });
  };

  createUser = async (req: Request, res: Response) => {
    const { status, message, data } = await create(req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await update(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status, message, data } = await deleted(parseInt(id) as number, req.body);
    return res.status(status).json({
      message,
      data,
    });
  };

  loginUser = async (req: Request, res: Response) => {
    const { status, message, exists } = await getUserAndPassword(req.body)

    if (exists == true) {
      const token = generateToken(req.body)
      setTokenCookie(res, token) // serializamos el token
    }

    return res.status(status).json({
      message,
      exists,
    })
  }

}
