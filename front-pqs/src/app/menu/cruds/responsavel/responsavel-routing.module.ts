import { Routes } from '@angular/router';

import { CadastrarResponsavelComponent } from './cadastrar';
import { ConsultarResponsavelComponent } from './consultar';
import { EditarResponsavelComponent } from './editar';

export const ResponsavelRoutes: Routes = [

    {
        path: 'responsavel',
        redirectTo: 'responsavel/consultar',
        pathMatch: 'full'
    },
    {
        path: 'responsavel/cadastrar',
        component: CadastrarResponsavelComponent,
    },
    {
        path: 'responsavel/consultar',
        component: ConsultarResponsavelComponent,
    },
    {
        path: 'responsavel/editar/:id',
        component: EditarResponsavelComponent
    }


];
