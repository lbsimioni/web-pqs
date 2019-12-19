import { Routes } from '@angular/router';

import { DespesaRoutes } from './despesa';
import { ReceitaRoutes } from './receita';
import { RendimentoRoutes } from './rendimento';
import { MatriculaRoutes } from './matricula';
import { ProdutoRoutes } from './produto';
import { CartaoPontoRoutes } from './cartao-ponto';

export const SistemaRoutes: Routes = [

    ... DespesaRoutes,
    ... ReceitaRoutes,
    ... RendimentoRoutes,
    ... MatriculaRoutes,
    ... ProdutoRoutes,
    ... CartaoPontoRoutes
    
];
