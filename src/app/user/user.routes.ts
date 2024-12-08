import { Routes } from "@angular/router";

export default [
    {
        path: 'misPedidos',
        loadComponent:()=>import('./mis-pedidos/mis-pedidos.component')
    },
    {
        path: 'miConfiguracion',
        loadComponent:()=>import('./mi-cuenta/mi-cuenta.component')
    },
    {
        path: 'pedido/:id',
        loadComponent:()=>import('./orden/orden.component')
    },
    {
        path: 'pseudoperfil',
        loadComponent:()=>import('./pseudoperfil/pseudoperfil.component')
    },
    {
        path: 'agregarPseudoperfil',
        loadComponent:()=>import('./agregar-pseudo/agregar-pseudo.component')
    },
    {
        path: 'editarPseudoperfil/:id',
        loadComponent:()=>import('./editar-pseudo/editar-pseudo.component')
    }
    ,
    {
        path: 'calendario',
        loadComponent:()=>import('./calendario/calendario.component')
    }
]as Routes