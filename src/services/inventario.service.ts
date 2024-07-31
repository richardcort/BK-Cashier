import { sequelize, db } from "../config";
import { InventarioInterface } from "../interfaces";

export const getAll = async () => {
    try {
        const query = `SELECT 
            p.codigo_producto, 
            p.nombre, 
            p.precio, 
            p.marca_codigo, 
            p.codigo_categoria, 
            i.aviso, 
            i.stock 
            FROM productos p 
            INNER JOIN inventarios i ON p.codigo_producto = i.codigo_producto
            WHERE p.status = 1;`;

        const [productosInventario] = await db.query(query);

        if (productosInventario.length == 0) {
            return {
                message: `No hay productos en el inventario encontrados`,
                status: 200,
                data: {
                    productosInventario,
                }
            };
        }

        return {
            message: `productos en inventario encontrados`,
            status: 200,
            data: {
                productosInventario
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
        const query = `SELECT 
            p.codigo_producto, 
            p.nombre, 
            p.precio, 
            p.marca_codigo, 
            p.codigo_categoria, 
            i.aviso, 
            i.stock 
            FROM productos p 
            INNER JOIN inventarios i ON p.codigo_producto = i.codigo_producto
            WHERE P.codigo_producto = ? AND p.status = 1;`;

        const [productoInventario] = await db.query(query, {
            replacements: [codigo],
            type: sequelize.QueryTypes.SELECT,
        });

        if (!productoInventario) {
            return {
                message: `Producto en el inventario no encontrado`,
                status: 200,
                data: {},
            }
        }

        return {
            message: `Producto en el inventario encontrado`,
            status: 200,
            data: {
                productoInventario,
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

export const update = async (codigo: string, data: InventarioInterface) => {
    try {
        const query = `UPDATE inventarios 
            SET 
            aviso = :aviso,
            stock = :stock,
            updatedAt = :updatedAt
            WHERE codigo_producto = :codigo_producto`;

        await db.query(query, {
            replacements: {
                codigo_producto: codigo,
                aviso: data.aviso,
                stock: data.stock,
                updatedAt: new Date(),
            },
            type: sequelize.QueryTypes.UPDATE,
        });

        return {
            message: `Se actulizo el inventario del producto`,
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
