import { DataTypes } from "sequelize";

const MarcaModel = {
    codigo_marca: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}

export { MarcaModel };