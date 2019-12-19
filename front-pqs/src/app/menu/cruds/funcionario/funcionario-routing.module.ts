import { Routes } from '@angular/router';

import { CadastrarFuncionarioComponent } from  './cadastrar';
import { ConsultarFuncionarioComponent } from './consultar';
import { EditarFuncionarioComponent } from './editar';

export const FuncionarioRoutes: Routes = [

    {
        path: 'funcionario',
        redirectTo: 'funcionario/consultar',
        pathMatch: 'full'
    },
    {
        path: 'funcionario/cadastrar',
        component: CadastrarFuncionarioComponent,
    },
	{
        path: 'funcionario/consultar',
        component: ConsultarFuncionarioComponent,
    },
    {
        path: 'funcionario/editar/:id',
        component: EditarFuncionarioComponent
    }
    
    
];
