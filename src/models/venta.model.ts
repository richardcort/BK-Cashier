import { DataTypes } from "sequelize";

const VentaModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    cedula_cliente: {
        type: DataTypes.STRING(15),
        allowNull: false,
        references: {
            model: 'clientes',
            key: 'cedula'
        }
    }
}

export { VentaModel };