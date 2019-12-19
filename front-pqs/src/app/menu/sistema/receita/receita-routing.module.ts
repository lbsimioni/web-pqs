import { Routes } from '@angular/router';

import { ConsultarReceitaComponent } from './consultar';
import { ReceitaExtraRoutes } from './extra';

export const ReceitaRoutes: Routes = [

    {
        path: 'receita',
        redirectTo: 'receita/consultar',
        pathMatch: 'full'
    },
    {
        path: 'receita/consultar',
        component: ConsultarReceitaComponent
    },
    ... ReceitaExtraRoutes

];
