import { Routes } from '@angular/router';

import { ConsultarMensalidadeComponent } from './consultar';


export const MensalidadeRoutes: Routes = [

    {
        path: 'mensalidade',
        redirectTo: 'mensalidade/consultar',
        pathMatch: 'full'
    },
    {
        path: 'mensalidade/consultar',
        component: ConsultarMensalidadeComponent,
    }
];
