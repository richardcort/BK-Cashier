import { DataTypes } from "sequelize";

const DetalleVentaModel = {
    id_detalle_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_venta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ventas',
            key: 'id'
        }
    },
    codigo_producto: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'productos',
            key: 'codigo_producto'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precio_venta: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}

export { DetalleVentaModel };