import { Routes } from '@angular/router';

import { LancarCartaoPontoComponent } from './lancar';
import { ConsultarCartaoPontoComponent } from './consultar';
import { EditarCartaoPontoComponent } from './editar';

import { BancoHorasRoutes } from './banco-horas';


export const CartaoPontoRoutes: Routes = [

    {
        path: 'cartao-ponto',
        redirectTo: 'cartao-ponto/consultar',
        pathMatch: 'full'
    },
    {
        path: 'cartao-ponto/lancar',
        component: LancarCartaoPontoComponent,
    },
    {
        path: 'cartao-ponto/consultar',
        component: ConsultarCartaoPontoComponent,
    },
    {
        path: 'cartao-ponto/editar/:id',
        component: EditarCartaoPontoComponent
    },
    ... BancoHorasRoutes,
];
