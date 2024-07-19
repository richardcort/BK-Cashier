import { DataTypes } from "sequelize";

const InventarioModel = {
    codigo_producto: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        references: {
            model: 'productos',
            key: 'codigo_producto'
        }
    },
    aviso: {
        type: DataTypes.INTEGER,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}

export { InventarioModel };