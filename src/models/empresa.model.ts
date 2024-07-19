import { DataTypes } from "sequelize";

const EmpresaModel = {
    rif: {
        type: DataTypes.STRING(100),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
    },
    direccion: {
        type: DataTypes.STRING(100),
    }
}

export { EmpresaModel };