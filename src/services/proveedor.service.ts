import { sequelize, db } from "../config";
import { ProoveedorInterface } from "../interfaces";

export const getAll = async () => {
    try {
        const query = `SELECT * FROM proveedores WHERE status = 1`

        const [proveedores] = await db.query(query)

        if (proveedores.length == 0) {
            return {
                message: `No hay proveedores encontrados`,
                status: 200,
                data: {
                    proveedores,
                }
            }
        }

        return {
            message: `Proveedores encontrados`,
            status: 200,
            data: {
                proveedores,
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
}

export const getOne = async (id_proveedor: string) => {
    try {
        const query = `SELECT * FROM proveedores WHERE status = 1 AND id_proveedor = ?`

        const [proveedor] = await db.query(query, {
            replacements: [id_proveedor],
            type: sequelize.QueryTypes.SELECT
        })

        if (!proveedor) {
            return {
                message: `Proveedor no encontrado`,
                status: 200,
                data: {},
            }
        }

        return {
            message: `Proveedor encontrado`,
            status: 200,
            data: {
                proveedor
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

export const create = async (data: ProoveedorInterface) => {
    try {
        const query = `INSERT INTO proveedores (
            id_proveedor,
            nombre,
            contacto_principal,
            telefono,
            correo,
            direccion,
            status,
            createdAt,
            updatedAt,
            deletedAt
        ) VALUES (
            :id_proveedor,
            :nombre,
            :contacto_principal,
            :telefono,
            :correo,
            :direccion,
            :status,
            :createdAt,
            :updatedAt,
            :deletedAt
        )`

        await db.query(query, {
            replacements: {
                id_proveedor: data.id_proveedor,
                nombre: data.nombre,
                contacto_principal: data.contacto_principal,
                telefono: data.telefono,
                correo: data.correo,
                direccion: data.direccion,
                status: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            },
            type: sequelize.QueryTypes.INSERT
        })

        return {
            message: `Se agrego el proveedor`,
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

export const update = async (id_proveedor: string, data: ProoveedorInterface) => {
    try {
        const query = `UPDATE proveedores SET 
                        nombre = :nombre,
                        contacto_principal = :contacto_principal,
                        telefono = :telefono,
                        correo = :correo,
                        direccion = :direccion,
                        updatedAt = :updatedAt
                    WHERE 
                        status = 1 AND 
                        id_proveedor = :id_proveedor;`

        await db.query(query, {
            replacements: {
                id_proveedor: id_proveedor,
                nombre: data.nombre,
                contacto_principal: data.contacto_principal,
                telefono: data.telefono,
                correo: data.correo,
                direccion: data.direccion,
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE
        })

        return {
            message: `Se actulizo el proveedor`,
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

export const deleted = async (id_proveedor: string) => {
    try {
        const query = `UPDATE proveedores SET 
                        deletedAt = :deletedAt,
                        status = 0
                    WHERE 
                        status = 1 AND 
                        id_proveedor = :id_proveedor;`

        await db.query(query, {
            replacements: {
                deletedAt: new Date(),
                id_proveedor: id_proveedor,
            },
            type: sequelize.QueryTypes.UPDATE
        })

        return {
            message: `Se Elimino el proveedor`,
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