import { DataTypes } from "sequelize";

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario: {
        type: DataTypes.STRING(50),
        unique: true,
    },
    clave: {
        type: DataTypes.STRING(400),
        allowNull: false,
    },
    rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(50),
        allowNull: false,
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