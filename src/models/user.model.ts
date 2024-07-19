import { DataType, DataTypes } from "sequelize";

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario: {
        type: DataTypes.STRING(50),
    },
    clave: {
        type: DataTypes.STRING(400),
    },
    rol_id: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING(50),
    },
    apellido: {
        type: DataTypes.STRING(50),
    },
    status:{
        type: DataTypes.BOOLEAN,
        default: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}

export { UserModel };