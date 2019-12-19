import { Routes } from '@angular/router';

import { CadastrarReceitaExtraComponent } from './cadastrar';
import { ConsultarReceitaExtraComponent } from './consultar';
import { EditarReceitaExtraComponent } from './editar';

export const ReceitaExtraRoutes: Routes = [

    {
        path: 'receita/extra',
        redirectTo: 'receita/extra/consultar',
        pathMatch: 'full'
    },
    {
        path: 'receita/extra/cadastrar',
        component: CadastrarReceitaExtraComponent,
    },
    {
        path: 'receita/extra/consultar',
        component: ConsultarReceitaExtraComponent,
    },
    {
        path: 'receita/extra/editar/:id',
        component: EditarReceitaExtraComponent
    }
];
