import { DataTypes } from "sequelize";

const ClienteModel = {
    cedula: {
        type: DataTypes.STRING(15),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING(100),
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}

export { ClienteModel };