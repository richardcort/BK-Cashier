import { Sequelize } from "sequelize";
import { UserModel, RolModel } from "../models";
import sequelize from "sequelize";

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

// relations
RolDB.hasMany(UserDB, { foreignKey: 'rol_id' });
UserDB.belongsTo(RolDB, { foreignKey: 'rol_id' });

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

export { db, sequelize, UserDB};