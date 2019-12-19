import { Routes } from '@angular/router';

import { FuncionarioRoutes } from './funcionario';
import { AlunoRoutes } from './aluno';
import { ResponsavelRoutes } from './responsavel';

export const CrudsRoutes: Routes = [

    ... FuncionarioRoutes,
    ... AlunoRoutes,
    ... ResponsavelRoutes
];
