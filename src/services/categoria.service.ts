import { QueryTypes } from "sequelize";
import { db, sequelize } from "../config";
import { CategoriaInterface } from "../interfaces";

export const getAll = async () => {
    try {
        const [categorias] = await db.query("SELECT * FROM categorias WHERE status = 1");

        if (categorias.length == 0) {
            return {
                message: `No hay categorias encontradas`,
                status: 200,
                data: {
                    categorias,
                }
            }
        }

        return {
            message: `Categorias encontradas`,
            status: 200,
            data: {
                categorias,
            }
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
};

export const getOne = async (codigo: string) => {
    try {
        const categoria = await db.query("SELECT * FROM categorias WHERE codigo_categoria = ? AND status = 1", {
            replacements: [codigo],
            type: sequelize.QueryTypes.SELECT,
        });

        if (!categoria) {
            return {
                message: `Categoria no encontrada`,
                status: 200,
                data: {},
            };
        }

        return {
            message: `Categoria encontrada`,
            status: 200,
            data: {
                categoria,
            },
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        }
    }
};

export const create = async (data: CategoriaInterface) => {
    try {
        await db.query("INSERT INTO categorias (codigo_categoria, nombre, descripcion, status, createdAt, updatedAt, deletedAt) VALUES (:codigo_categoria, :nombre, :descripcion, :status, :createdAt, :updatedAt, :deletedAt)", {
            replacements: {
                codigo_categoria: data.codigo_categoria,
                nombre: data.nombre,
                descripcion: data.descripcion,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            type: sequelize.QueryTypes.INSERT,
        });

        return {
            message: `Se agrego la categoria`,
            status: 200,
            data: {},
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
};

export const update = async (codigo: string, data: CategoriaInterface) => {
    try {
        await db.query(`UPDATE categorias SET
                            nombre = :nombre,
                            descripcion = :descripcion,
                            updatedAt = :updatedAt
                        WHERE codigo_categoria = :codigo_categoria AND status = 1`, {
            replacements: {
                codigo_categoria: codigo,
                nombre: data.nombre,
                descripcion: data.descripcion,
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se actulizo la categoria`,
            status: 200,
            data: {},
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
};

export const deleted = async (codigo: string) => {
    try {
        await db.query(`UPDATE categorias SET
                            status = 0,
                            deletedAt = :deletedAt
                        WHERE codigo_categoria = :codigo_categoria AND status = 1`, {
            replacements: {
                codigo_categoria: codigo,
                deletedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se elimino la categoria`,
            status: 200,
            data: {},
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
};