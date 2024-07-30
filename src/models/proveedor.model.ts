import { DataTypes } from "sequelize";

const ProveedorModel = {
    id_proveedor: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    contacto_principal: {
        type: DataTypes.STRING(200),
    },
    telefono: {
        type: DataTypes.STRING(100),
    },
    correo: {
        type: DataTypes.STRING(100),
    },
    direccion: {
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

export { ProveedorModel };