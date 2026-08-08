/*
=============================================================
 PROYECTO: HELP DESK AZ FRONTEND_AZ Angular
 AUTOR: ARIEL ZAMORA
 FECHA: 28-07-2026
=============================================================
*/

import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Tickets } from './pages/tickets/tickets';
import { Usuarios } from './pages/usuarios/usuarios';
import { Categorias } from './pages/categorias/categorias';
import { Prioridades } from './pages/prioridades/prioridades';
import { Estados } from './pages/estados/estados';
import { Historial } from './pages/historial/historial';
import { Registro } from './pages/registro/registro';
import { authGuard } from './guards/auth.guard';
import { AdministrarTickets } from './pages/administrar-tickets/administrar-tickets';
import { Perfil } from './pages/perfil/perfil';
import { ActualizarPerfil } from './pages/actualizar-perfil/actualizar-perfil';

export const routes: Routes = [

    { path: '', component: Login },

    { path: 'dashboard', component: Dashboard, canActivate:[authGuard]},

    { path: 'tickets', component: Tickets, canActivate:[authGuard] },

    { path: 'usuarios', component: Usuarios, canActivate:[authGuard] },

    { path: 'categorias', component: Categorias, canActivate:[authGuard] },

    { path: 'prioridades', component: Prioridades, canActivate:[authGuard] },

    { path: 'estados', component: Estados, canActivate:[authGuard] },

    { path: 'historial', component: Historial, canActivate:[authGuard] },

    { path: 'registro', component: Registro},

    { path:'administrar-tickets', component:AdministrarTickets, canActivate:[authGuard]},

    {  path:'perfil',  component:Perfil,  canActivate:[authGuard]},
    
    { path:'actualizar-perfil', component:ActualizarPerfil, canActivate:[authGuard] },

    { path:'tickets-asignados',
        loadComponent:()=>import('./pages/tickets-asignados/tickets-asignados')
        .then(m=>m.TicketsAsignados)
    },

    { path: '**', redirectTo: '' }

];