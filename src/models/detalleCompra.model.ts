import { DataTypes } from "sequelize";

const DetalleCompraModel = {
    id_detalle_compra: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_compra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'compras',
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
    precio_compra: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    }
}

export { DetalleCompraModel };