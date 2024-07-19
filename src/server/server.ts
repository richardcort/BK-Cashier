import express from "express";
import cors from "cors";
import { userRoute } from "../routes/index.route";
import { db } from "../config/sequelize.config";

export class Server {
    private app: any;
    private port: string | number;
    private pre: string; // pre means prefijo
    private paths: any;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.pre = "/api";
        this.paths = {
            users: this.pre + "/users",
        }; //paths means rutas or endpoints 

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.paths.users, userRoute);
    }
    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public"));
    }

    async connectDB() {
        await db.authenticate().then(() => {
            console.log("Conexión exitosa a la base de datos");
        }).catch((error: any) => {
            console.log("No se pudo conectar a la base de datos")
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en localhost:${this.port}`);
        });
    }
}
