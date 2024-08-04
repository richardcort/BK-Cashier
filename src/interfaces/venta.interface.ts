export interface VentaInterface {
    id?: number
    cedula_cliente: string
    detallesVenta: DetalleVentaInterface[]
}

export interface DetalleVentaInterface {
    id_detalle_venta?: number
    id_venta?: number
    codigo_producto: string
    cantidad: number
    precio_venta: number
}