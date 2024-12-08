import { Routes } from "@angular/router";

export default [
    {
        path: 'dashboard',
        loadComponent:()=>import('./dashboard/dashboard.component')
    },
    {
        path: 'productos',
        loadComponent:()=>import('./productos/productos.component')
    },
    {
        path: 'nuevoProducto',
        loadComponent:()=>import('./formularios/productos/agregar-producto/agregar-producto.component')
    },
    {
        path: 'editarProducto/:id',
        loadComponent:()=>import('./formularios/productos/editar-producto/editar-producto.component')
    },
    {
        path: 'usuarios',
        loadComponent:()=>import('./usuarios/usuarios.component')
    },
    {
        path: 'nuevoUsuario',
        loadComponent:()=>import('./formularios/usuarios/agregar-usuario/agregar-usuario.component')
    },
    {
        path: 'editarUsuario/:id',
        loadComponent:()=>import('./formularios/usuarios/editar-usuario/editar-usuario.component')
    },
    {
        path: 'repartidores',
        loadComponent:()=>import('./repartidores/repartidores.component')
    },
    {
        path: 'nuevoRepartidor',
        loadComponent:()=>import('./formularios/repartidores/agregar-repartidor/agregar-repartidor.component')
    },
    {
        path: 'editarRepartidor/:id',
        loadComponent:()=>import('./formularios/repartidores/editar-repartidor/editar-repartidor.component')
    },
    {
        path: 'pedidos',
        loadComponent:()=>import('./ordenes/ordenes.component')
    },
    {
        path: 'nuevoPedido',
        loadComponent:()=>import('./formularios/ordenes/agregar-orden/agregar-orden.component')
    },
    {
        path: 'editarPedido/:id',
        loadComponent:()=>import('./formularios/ordenes/editar-orden/editar-orden.component')
    },
    {
        path: 'graficas',
        loadComponent:()=>import('./graficas/graficas.component')
    },
]as Routes