import { Routes } from '@angular/router';

import { CrudsRoutes } from './cruds';
import { SistemaRoutes } from './sistema';
import { MenuComponent } from './menu.component';
import { DashboardComponent } from './dashboard';

export const MenuRoutes: Routes = [

    {
        path: 'menu',
        component: MenuComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            ... CrudsRoutes,
            ... SistemaRoutes
        ]
    },
    
];
