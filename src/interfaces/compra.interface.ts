export interface CompraInterface {
    id?: number
    id_proveedor: string
    detallesCompra: DetalleCompraInterface[]
}

export interface DetalleCompraInterface {
    id_detalle_compra?: number
    id_compra?: number
    codigo_producto: string
    cantidad: number
    precio_compra: number
}