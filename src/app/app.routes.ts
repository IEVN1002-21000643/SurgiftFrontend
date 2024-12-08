import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-guard/auth-guard.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=>import('./inicio/inicio.component')
    },
    {
        path: 'carrito',
        loadComponent: ()=>import('./carrito/carrito.component')
    },
    {
        path: 'tienda',
        loadComponent: ()=>import('./tienda/tienda.component')
    },
    {
        path: 'producto/:id',
        loadComponent: ()=>import('./plantillas/productos/productos.component')
    },
    {
        path: 'finalizarCompra',
        loadComponent: ()=>import('./finalizar-compra/finalizar-compra.component')
    },
    {
        path: 'auth',
        loadChildren: ()=>import('./auth/auth.routes')
    },
    {
        path: 'admin',
        loadChildren: ()=>import('./admin/admin.routes'),
        canActivate: [AuthGuard]
    },
    {
        path: 'usuario',
        loadChildren: ()=>import('./user/user.routes'),
        canActivate: [AuthGuard]
    }
];