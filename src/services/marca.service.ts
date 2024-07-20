import { db, sequelize } from "../config"
import { MarcaInterface } from "../interfaces"

export const getAll = async () => {
    try {
        const [marcas] = await db.query("SELECT * FROM marcas WHERE status = 1");

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

export const getOne = async (id: string) => {
    try {
        const [marca] = await db.query("SELECT * FROM marcas WHERE codigo_marca = ? AND status = 1", {
            replacements: [id],
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
        await db.query("INSERT INTO marcas (codigo_marca, nombre, createdAt, updatedAt, deletedAt, status) VALUES (:codigo_marca, :nombre, :createdAt, :updatedAt, :deletedAt, :status)", {
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
        await db.query(`UPDATE marcas SET
            nombre = :nombre,
            updatedAt = :updateAt
        WHERE codigo_marca = :codigo_marca`,
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
        await db.query(`UPDATE marcas SET
            status = 0,
            deletedAt = :deletedAt
        WHERE codigo_marca = :codigo_marca`,
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