export interface UserInterface {
    id?: number | string
    nombre: string
    apellido: string
    usuario: string
    clave: string
    rol: RolInterface
    status?: boolean
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface RolInterface {
    id?: number
    name: string
    deletedAt?: Date
}