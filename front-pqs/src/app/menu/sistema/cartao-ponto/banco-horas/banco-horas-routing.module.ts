import { Routes } from '@angular/router';

import { ConsultarBancoHorasComponent } from './consultar';


export const BancoHorasRoutes: Routes = [

    {
        path: 'banco-horas',
        redirectTo: 'banco-horas/consultar',
        pathMatch: 'full'
    },
    {
        path: 'banco-horas/consultar',
        component: ConsultarBancoHorasComponent,
    },
];
