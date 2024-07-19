import { DataTypes } from "sequelize";

const RolModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
};

export { RolModel };