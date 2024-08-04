import { db, sequelize } from "../config";
import { CompraInterface } from "../interfaces";

export const getOne = async (id: number) => {
    try {
        const queryCompra = `SELECT c.id, c.createdAt, p.id_proveedor, p.nombre, SUM((dc.cantidad * dc.precio_compra)) AS total 
            FROM compras c 
            INNER JOIN proveedores p ON p.id_proveedor = c.id_proveedor
            INNER JOIN detallecompras dc ON dc.id_compra = c.id
            WHERE c.id = ?`

        const [compra] = await db.query(queryCompra, {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        })

        if (!compra) {
            return {
                message: `Compra no encontrada`,
                status: 200,
                data: {},
            }
        }

        const queryProductosCompra = `SELECT dv.codigo_producto, p.nombre, m.nombre AS marca, dv.precio_compra, dv.cantidad, (dv.cantidad * dv.precio_compra) AS subtotal
            FROM detallecompras dv
            INNER JOIN productos p ON p.codigo_producto = dv.codigo_producto
            INNER JOIN marcas m ON m.codigo_marca = p.marca_codigo
            WHERE dv.id_compra = ?`

        const [productosCompra] = await db.query(queryProductosCompra, {
            replacements: [id],
        })

        if (productosCompra.length == 0) {
            return {
                message: `No hay productos en la compra`,
                status: 200,
                data: {}
            }
        }

        return {
            message: `Compras encontradas`,
            status: 200,
            data: {
                compra,
                productosCompra
            }
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        }
    }
}

export const getAll = async () => {
    try {
        const query = `SELECT c.id, c.createdAt, p.id_proveedor, p.nombre, SUM((dc.cantidad * dc.precio_compra)) AS total 
            FROM compras c 
            INNER JOIN proveedores p ON p.id_proveedor = c.id_proveedor
            INNER JOIN detallecompras dc ON dc.id_compra = c.id
            GROUP BY c.id`

        const [compras] = await db.query(query);

        if (compras.length == 0) {
            return {
                message: `No hay compras encontradas`,
                status: 200,
                data: {
                    compras,
                }
            }
        }

        return {
            message: `Compras encontradas`,
            status: 200,
            data: {
                compras
            }
        }

    } catch (error) {
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        }
    }
}

export const create = async (data: CompraInterface) => {
    const transaction = await db.transaction()

    try {
        const queryCompra = `INSERT INTO compras (
                id_proveedor,
                createdAt, 
                updatedAt
            ) VALUES (
                :id_proveedor,
                :createdAt,
                :updatedAt
            )
            `

        const [result] = await db.query(queryCompra, {
            replacements: {
                id_proveedor: data.id_proveedor,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            type: sequelize.QueryTypes.INSERT,
            transaction
        })

        const compraId = result

        for (const detalle of data.detallesCompra) {
            const queryDetalle = `INSERT INTO detallecompras (
                id_compra,
                codigo_producto,
                cantidad,
                precio_compra,
                createdAt,
                updatedAt
            ) VALUES (
                :id_compra,
                :codigo_producto,
                :cantidad,
                :precio_compra,
                :createdAt,
                :updatedAt
            )`

            await db.query(queryDetalle, {
                replacements: {
                    id_compra: compraId,
                    codigo_producto: detalle.codigo_producto,
                    cantidad: detalle.cantidad,
                    precio_compra: detalle.precio_compra,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                type: sequelize.QueryTypes.INSERT,
                transaction
            })

            const queryUpdateInventario = `UPDATE inventarios SET
            stock = stock + :stock,
            updatedAt = :updatedAt
            WHERE codigo_producto = :codigo_producto`

            await db.query(queryUpdateInventario, {
                replacements: {
                    stock: detalle.cantidad,
                    codigo_producto: detalle.codigo_producto,
                    updatedAt: new Date()
                },
                type: sequelize.QueryTypes.UPDATE,
                transaction
            })
        }

        await transaction.commit()

        return {
            message: 'Compra registrada',
            status: 200,
            data: { compraId }
        }

    } catch (error) {
        await transaction.rollback()
        console.log(error);
        return {
            message: `Contact the administrator: error`,
            status: 500,
            data: {},
        };
    }
}