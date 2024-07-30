import { db, sequelize } from "../config"
import { MarcaInterface } from "../interfaces"

export const getAll = async () => {
    try {
        const query = `SELECT * FROM marcas WHERE status = 1`;

        const [marcas] = await db.query(query);

        if (marcas.length == 0) {
            return {
                message: `No hay marcas encontradas`,
                status: 200,
                data: {
                    marcas,
                }
            };
        }

        return {
            message: `Marcas encontradas`,
            status: 200,
            data: {
                marcas
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
        const query = `SELECT * FROM marcas WHERE codigo_marca = ? AND status = 1`;

        const [marca] = await db.query(query, {
            replacements: [codigo],
            type: sequelize.QueryTypes.SELECT,
        });

        if (!marca) {
            return {
                message: `Marca no encontrada`,
                status: 200,
                data: {},
            };
        }

        return {
            message: `Marca encontrada`,
            status: 200,
            data: {
                marca,
            },
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

export const create = async (data: MarcaInterface) => {
    try {
        const query = `INSERT INTO marcas (
            codigo_marca,
            nombre, 
            createdAt, 
            updatedAt, 
            deletedAt, 
            status
            ) VALUES (
            :codigo_marca, 
            :nombre, 
            :createdAt, 
            :updatedAt, 
            :deletedAt, 
            :status
            )`;

        await db.query(query, {
            replacements: {
                codigo_marca: data.codigo_marca,
                nombre: data.nombre,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
                status: true,
            },
            type: sequelize.QueryTypes.INSERT,
        });

        return {
            message: `Se agrego la marca`,
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

export const update = async (codigo: string, data: MarcaInterface) => {
    try {
        const query = `UPDATE marcas SET
            nombre = :nombre,
            updatedAt = :updateAt
            WHERE codigo_marca = :codigo_marca AND status = 1`;

        await db.query(query,
            {
                replacements: {
                    codigo_marca: codigo,
                    nombre: data.nombre,
                    updateAt: new Date(),
                },
                type: sequelize.QueryTypes.UPDATE,
            });

        return {
            message: `Se actulizo la marca`,
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
        const query = `UPDATE marcas SET
            status = 0,
            deletedAt = :deletedAt
            WHERE codigo_marca = :codigo_marca AND status = 1`;

        await db.query(query,
            {
                replacements: {
                    codigo_marca: codigo,
                    deletedAt: new Date(),
                },
                type: sequelize.QueryTypes.UPDATE,
            });

        return {
            message: `Se elimino la marca`,
            status: 200,
            data: {},
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error` + error,
            status: 500,
            data: {},
        };
    }
};