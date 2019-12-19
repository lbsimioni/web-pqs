import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuRoutes } from './menu';
import { LoginRoutes } from './login';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    ... LoginRoutes,
    ... MenuRoutes
    
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
