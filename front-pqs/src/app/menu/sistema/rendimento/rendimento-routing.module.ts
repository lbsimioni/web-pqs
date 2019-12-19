import { Routes } from '@angular/router';

import { ConsultarRendimentoComponent } from './consultar';

export const RendimentoRoutes: Routes = [

    {
        path: 'rendimento',
        redirectTo: 'rendimento/consultar',
        pathMatch: 'full'
    },
    {
        path: 'rendimento/consultar',
        component: ConsultarRendimentoComponent
    }

];
