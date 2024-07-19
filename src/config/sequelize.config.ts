import { Sequelize } from "sequelize";
import sequelize from "sequelize";
import {
    UserModel,
    RolModel, CategoriaModel,
    ClienteModel,
    EmpresaModel,
    InventarioModel,
    MarcaModel,
    ProductoModel,
    ProveedorModel,
    VentaModel,
    DetalleVentaModel,
    DetalleCompraModel,
    CompraModel
} from "../models";

// declare dbName and dbPassword
const dbName: string | undefined = process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "";
const dbPassword: string | undefined = process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "";

// set up the sequelize object
const db = new Sequelize(dbName, "root", dbPassword, {
    dialect: "mysql",
    host: "localhost"
});

// create the database tables
const UserDB = db.define('users', UserModel);
const RolDB = db.define('roles', RolModel);
const MarcaDB = db.define('marcas', MarcaModel);
const CategoriaDB = db.define('categorias', CategoriaModel);
const InventarioDB = db.define('inventarios', InventarioModel);
const ProductoDB = db.define('productos', ProductoModel);
const EmpresaDB = db.define('empresas', EmpresaModel);

const ClienteDB = db.define('clientes', ClienteModel);
const ProveedorDB = db.define('proveedores', ProveedorModel);
const VentaDB = db.define('ventas', VentaModel);
const CompraDB = db.define('compras', CompraModel);
const DetalleVentaDB = db.define('detalleventas', DetalleVentaModel);
const DetalleCompraDB = db.define('detallecompras', DetalleCompraModel);

// relations
RolDB.hasMany(UserDB, { foreignKey: 'rol_id' });
UserDB.belongsTo(RolDB, { foreignKey: 'rol_id' });

MarcaDB.hasMany(ProductoDB, { foreignKey: 'marca_codigo' });
ProductoDB.belongsTo(MarcaDB, { foreignKey: 'marca_codigo' });

CategoriaDB.hasMany(ProductoDB, { foreignKey: 'codigo_categoria' });
ProductoDB.belongsTo(CategoriaDB, { foreignKey: 'codigo_categoria' });

ProductoDB.hasOne(InventarioDB, { foreignKey: 'codigo_producto' });
InventarioDB.belongsTo(ProductoDB, { foreignKey: 'codigo_producto' });

ClienteDB.hasMany(VentaDB, { foreignKey: 'cedula_cliente' });
VentaDB.belongsTo(ClienteDB, { foreignKey: 'cedula_cliente' });

VentaDB.hasMany(DetalleVentaDB, { foreignKey: 'id_venta' });
DetalleVentaDB.belongsTo(VentaDB, { foreignKey: 'id_venta' });

ProductoDB.hasMany(DetalleVentaDB, { foreignKey: 'codigo_producto' });
DetalleVentaDB.belongsTo(ProductoDB, { foreignKey: 'codigo_producto' });

ProveedorDB.hasMany(CompraDB, { foreignKey: 'id_proveedor' });
CompraDB.belongsTo(ProveedorDB, { foreignKey: 'id_proveedor' });

CompraDB.hasMany(DetalleCompraDB, { foreignKey: 'id_compra' });
DetalleCompraDB.belongsTo(CompraDB, { foreignKey: 'id_compra' });

ProductoDB.hasMany(DetalleCompraDB, { foreignKey: 'codigo_producto' });
DetalleCompraDB.belongsTo(ProductoDB, { foreignKey: 'codigo_producto' });


// Sincroniza los modelos con la base de datos
const syncModels = async () => {
    await db.sync({ alter: true });
    try {
        //await User.sync({ alter: true });
        //await Rol.sync({ alter: true });
    } catch (error) {
        console.error(error);
    }
};
syncModels();

export { db, sequelize };