import { DataTypes } from "sequelize";

const CompraModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_proveedor: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'proveedores',
            key: 'id_proveedor'
        }
    }
}

export { CompraModel };