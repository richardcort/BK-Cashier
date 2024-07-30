import { sequelize, db } from "../config";
import { ProductoInterface } from "../interfaces/producto.interface";

export const getAll = async () => {
    try {
        const query = `SELECT * FROM productos WHERE status = 1`;

        const [productos] = await db.query(query);

        if (productos.length == 0) {
            return {
                message: `No hay productos encontrados`,
                status: 200,
                data: {
                    productos,
                }
            };
        }

        return {
            message: `productos encontrados`,
            status: 200,
            data: {
                productos
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
        const query = `SELECT * FROM productos WHERE status = 1 AND codigo_producto = ?`;

        const [producto] = await db.query(query, {
            replacements: [codigo],
            type: sequelize.QueryTypes.SELECT,
        });

        if (!producto) {
            return {
                message: `Producto no encontrado`,
                status: 200,
                data: {},
            }
        }

        return {
            message: `Producto encontrado`,
            status: 200,
            data: {
                producto,
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
};

export const create = async (data: ProductoInterface) => {
    try {
        const query = `INSERT INTO productos (
            codigo_producto, 
            nombre, 
            descripcion, 
            precio, 
            marca_codigo, 
            codigo_categoria, 
            status, 
            deletedAt, 
            createdAt, 
            updatedAt
            ) VALUES (
            :codigo_producto, 
            :nombre, 
            :descripcion, 
            :precio, 
            :marca_codigo, 
            :codigo_categoria, 
            :status, 
            :deletedAt, 
            :createdAt, 
            :updatedAt
            );`;

        await db.query(query, {
            replacements: {
                codigo_producto: data.codigo_producto,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                marca_codigo: data.marca_codigo,
                codigo_categoria: data.codigo_categoria,
                status: true,
                deletedAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.INSERT,
        });

        return {
            message: `Se agrego el produto`,
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

export const update = async (codigo: string, data: ProductoInterface) => {
    try {
        const query = `UPDATE productos
            SET 
            nombre = :nombre,
            descripcion = :descripcion,
            precio = :precio,
            marca_codigo = :marca_codigo,
            codigo_categoria = :codigo_categoria,
            updatedAt = :updatedAt
            WHERE 
            status = 1 AND 
            codigo_producto = :codigo_producto;
            `;

        await db.query(query, {
            replacements: {
                codigo_producto: data.codigo_producto,
                nombre: data.nombre,
                descripcion: data.descripcion,
                precio: data.precio,
                marca_codigo: data.marca_codigo,
                codigo_categoria: data.codigo_categoria,
                status: true,
                updatedAt: new Date(),
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
        const query = `UPDATE productos SET
            status = 0,
            deletedAt = :deletedAt
            WHERE codigo_producto = :codigo_producto AND status = 1`;

        await db.query(query, {
            replacements: {
                codigo_producto: codigo,
                deletedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se elimino el producto`,
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