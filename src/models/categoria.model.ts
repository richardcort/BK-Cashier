import { DataTypes } from "sequelize";

const CategoriaModel = {
    codigo_categoria: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}

export { CategoriaModel };