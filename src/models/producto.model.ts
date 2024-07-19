import { DataTypes } from "sequelize";

const ProductoModel = {
    codigo_producto: {
        type: DataTypes.STRING(50),
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    precio: {
        type: DataTypes.DECIMAL,
        defaultValue: 0,
    },
    marca_codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'marcas',
            key: 'codigo_marca'
        }
    },
    codigo_categoria: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'codigo_categoria'
        }
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    deletedAt: {
        type: DataTypes.DATE,
    }
}

export { ProductoModel };