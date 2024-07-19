export interface UserInterface{
    id?:number|string;
    nombre:string;
    apellido:string;
    usuario:string;
    clave:string;
    rol_id?:number |string;
    status?:boolean;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date;
}