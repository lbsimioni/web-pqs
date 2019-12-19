import { Routes } from '@angular/router';

import { CadastrarMatriculaComponent } from './cadastrar';
import { ConsultarMatriculaComponent } from './consultar';
import { EditarMatriculaComponent } from './editar';

import { MensalidadeRoutes } from './mensalidade';


export const MatriculaRoutes: Routes = [

    {
        path: 'matricula',
        redirectTo: 'matricula/consultar',
        pathMatch: 'full'
    },
    {
        path: 'matricula/cadastrar',
        component: CadastrarMatriculaComponent,
    },
    {
        path: 'matricula/consultar',
        component: ConsultarMatriculaComponent,
    },
    {
        path: 'matricula/editar/:id',
        component: EditarMatriculaComponent
    },
    ... MensalidadeRoutes
];
