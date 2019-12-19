import { Routes } from '@angular/router';

import { CadastrarDespesaComponent } from './cadastrar';
import { ConsultarDespesaComponent } from './consultar';
import { EditarDespesaComponent } from './editar';

import { DespesaExtraRoutes } from './extra';

export const DespesaRoutes: Routes = [

    {
        path: 'despesa',
        redirectTo: 'despesa/consultar',
        pathMatch: 'full'
    },
    {
        path: 'despesa/cadastrar',
        component: CadastrarDespesaComponent,
    },
    {
        path: 'despesa/consultar',
        component: ConsultarDespesaComponent,
    },
    {
        path: 'despesa/editar/:id',
        component: EditarDespesaComponent
    },
    ... DespesaExtraRoutes
];
