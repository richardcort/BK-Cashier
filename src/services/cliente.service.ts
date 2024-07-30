import { sequelize, db } from "../config";
import { ClienteInterface } from "../interfaces";

export const getAll = async () => {
    try {
        const query = `SELECT * FROM clientes WHERE status = 1`;

        const [clientes] = await db.query(query);

        if (clientes.length == 0) {
            return {
                message: `No hay clientes encontrados`,
                status: 200,
                data: {
                    clientes,
                }
            };
        }

        return {
            message: `Clientes encontrados`,
            status: 200,
            data: {
                clientes,
            }
        };

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}

export const getOne = async (cedula: string) => {
    try {
        const query = `SELECT * FROM clientes WHERE status = 1 AND cedula = ?`;

        const [cliente] = await db.query(query, {
            replacements: [cedula],
            type: sequelize.QueryTypes.SELECT,
        });

        if (!cliente) {
            return {
                message: `Cliente no encontrado`,
                status: 200,
                data: {},
            }
        }

        return {
            message: `Cliente encontrado`,
            status: 200,
            data: {
                cliente
            },
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}

export const create = async (data: ClienteInterface) => {
    try {
        const query = `INSERT INTO clientes (
            cedula,
            nombre,
            apellido,
            telefono,
            status, 
            deletedAt, 
            createdAt, 
            updatedAt
        ) VALUES (
            :cedula,
            :nombre,
            :apellido,
            :telefono,
            :status, 
            :deletedAt, 
            :createdAt, 
            :updatedAt
        )`;

        await db.query(query, {
            replacements: {
                cedula: data.cedula,
                nombre: data.nombre,
                apellido: data.apellido,
                telefono: data.telefono,
                status: true,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.INSERT
        });

        return {
            message: `Se agrego el cliente`,
            status: 200,
            data: {},
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}

export const update = async (cedula: string, data: ClienteInterface) => {
    try {
        const query = `UPDATE clientes SET
            nombre = :nombre,
            apellido = :apellido,
            telefono = :telefono,
            updatedAt = :updatedAt
            WHERE 
            status = 1 AND
            cedula = :cedula`;

        await db.query(query, {
            replacements: {
                cedula: cedula,
                nombre: data.nombre,
                apellido: data.apellido,
                telefono: data.telefono,
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se actulizo el cliente`,
            status: 200,
            data: {},
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}

export const deleted = async (cedula: string) => {
    try {
        const query = `UPDATE clientes SET
            deletedAt = :deletedAt,
            status = 0
            WHERE 
            status = 1 AND
            cedula = :cedula`;

        await db.query(query, {
            replacements: {
                cedula: cedula,
                deletedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        })

        return {
            message: `Se elimino el cliente`,
            status: 200,
            data: {},
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}