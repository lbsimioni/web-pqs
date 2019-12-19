import { Routes } from '@angular/router';

import { CadastrarAlunoComponent } from './cadastrar';
import { ConsultarAlunoComponent } from './consultar';
import { EditarAlunoComponent } from './editar';

export const AlunoRoutes: Routes = [

    {
        path: 'aluno',
        redirectTo: 'aluno/consultar',
        pathMatch: 'full'
    },
    {
        path: 'aluno/cadastrar',
        component: CadastrarAlunoComponent,
    },
    {
        path: 'aluno/consultar',
        component: ConsultarAlunoComponent,
    },
    {
        path: 'aluno/editar/:id',
        component: EditarAlunoComponent
    }


];
