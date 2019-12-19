import { Routes } from '@angular/router';

import { CadastrarDespesaExtraComponent } from './cadastrar';
import { ConsultarDespesaExtraComponent } from './consultar';
import { EditarDespesaExtraComponent } from './editar';

export const DespesaExtraRoutes: Routes = [

    {
        path: 'despesa/extra',
        redirectTo: 'despesa/extra/consultar',
        pathMatch: 'full'
    },
    {
        path: 'despesa/extra/cadastrar',
        component: CadastrarDespesaExtraComponent,
    },
    {
        path: 'despesa/extra/consultar',
        component: ConsultarDespesaExtraComponent,
    },
    {
        path: 'despesa/extra/editar/:id',
        component: EditarDespesaExtraComponent
    }
];
