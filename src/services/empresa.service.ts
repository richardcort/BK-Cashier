import { db, sequelize } from "../config";
import { EmpresaInterface } from "../interfaces";

export const getOne = async () => {
    try {
        const query = `SELECT * FROM empresas`;

        const [empresa] = await db.query(query);

        if (empresa.length == 0) {
            return {
                message: `Empresa no encontrada`,
                status: 200,
                data: empresa
            }
        }

        return {
            message: `Empresa encontrada`,
            status: 200,
            data: empresa[0]
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

export const create = async (data: EmpresaInterface) => {
    try {
        const query = `INSERT INTO empresas (
            rif, 
            nombre, 
            direccion, 
            createdAt, 
            updatedAt
        ) VALUES (
            :rif, 
            :nombre, 
            :direccion, 
            :createdAt, 
            :updatedAt
            );`;

        await db.query(query, {
            replacements: {
                rif: data.rif,
                nombre: data.nombre,
                direccion: data.direccion,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.INSERT
        });

        return {
            message: `Se agrego la empresa`,
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

export const update = async (rif: string, data: EmpresaInterface) => {
    try {
        const query = `UPDATE empresas SET
            nombre = :nombre,
            direccion = :direccion,
            updatedAt = :updatedAt
        WHERE rif = :rif`;

        await db.query(query, {
            replacements: {
                rif: rif,
                nombre: data.nombre,
                direccion: data.direccion,
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se actulizo la empresa`,
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
