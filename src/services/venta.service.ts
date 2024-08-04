import { db, sequelize } from "../config";
import { VentaInterface } from "../interfaces";

export const getAll = async () => {
    try {
        const query = `SELECT v.id, v.cedula_cliente, c.nombre, c.apellido, SUM((dv.cantidad * dv.precio_venta)) AS total ,v.createdAt 
            FROM ventas v 
            INNER JOIN clientes c ON c.cedula = v.cedula_cliente
            INNER JOIN detalleventas dv ON dv.id_venta = v.id
            GROUP BY v.id`

        const [ventas] = await db.query(query);

        if (ventas.length == 0) {
            return {
                message: `No hay ventas encontradas`,
                status: 200,
                data: {
                    ventas,
                }
            }
        }

        return {
            message: `ventas encontradas`,
            status: 200,
            data: {
                ventas
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

export const getOne = async (id: number) => {
    try {
        const queryVenta = `SELECT v.id, v.cedula_cliente, c.nombre, c.apellido, v.createdAt,  SUM((dv.cantidad * dv.precio_venta)) AS total FROM ventas v
            INNER JOIN clientes c ON c.cedula = v.cedula_cliente
            INNER JOIN detalleventas dv ON dv.id_venta = v.id
            WHERE v.id = ?`

        const [venta] = await db.query(queryVenta, {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT
        })

        if (!venta) {
            return {
                message: `Venta no encontrada`,
                status: 200,
                data: {},
            }
        }

        const queryProductosVenta = `SELECT dv.codigo_producto, p.nombre, dv.precio_venta, dv.cantidad, (dv.cantidad * dv.precio_venta) AS subtotal FROM detalleventas dv
            INNER JOIN productos p ON p.codigo_producto = dv.codigo_producto
            WHERE dv.id_venta = ?`

        const [productosVenta] = await db.query(queryProductosVenta, {
            replacements: [id],
        })

        if (productosVenta.length == 0) {
            return {
                message: `No hay productos en la venta`,
                status: 200,
                data: {}
            }
        }

        return {
            message: `Ventas encontradas`,
            status: 200,
            data: {
                venta,
                productosVenta
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

export const create = async (data: VentaInterface) => {
    const transaction = await db.transaction()

    try {
        const queryVenta = `INSERT INTO ventas (
                cedula_cliente,
                createdAt,
                updatedAt
            ) VALUES (
                :cedula_cliente,
                :createdAt,
                :updatedAt
            )`

        const [result] = await db.query(queryVenta, {
            replacements: {
                cedula_cliente: data.cedula_cliente,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            type: sequelize.QueryTypes.INSERT,
            transaction
        })

        const ventaId = result

        for (const detalle of data.detallesVenta) {
            const queryDetalle = `INSERT INTO detalleventas (
                id_venta,
                codigo_producto,
                cantidad,
                precio_venta,
                createdAt,
                updatedAt
            ) VALUES (
                :id_venta,
                :codigo_producto,
                :cantidad,
                :precio_venta,
                :createdAt,
                :updatedAt
            )`

            await db.query(queryDetalle, {
                replacements: {
                    id_venta: ventaId,
                    codigo_producto: detalle.codigo_producto,
                    cantidad: detalle.cantidad,
                    precio_venta: detalle.precio_venta,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                type: sequelize.QueryTypes.INSERT,
                transaction
            })

            const queryUpdateInventario = `UPDATE inventarios SET
            stock = stock - :stock,
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
            message: 'Venta registrada',
            status: 200,
            data: { ventaId }
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