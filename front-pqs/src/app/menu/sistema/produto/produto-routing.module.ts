import { Routes } from '@angular/router';

import { CadastrarProdutoComponent } from './cadastrar';
import { ConsultarProdutoComponent } from './consultar';
import { EditarProdutoComponent } from './editar';

import { VendasRoutes } from './vendas';
import { EntradaRoutes } from './entrada';

export const ProdutoRoutes: Routes = [

    {
        path: 'produto',
        redirectTo: 'produto/consultar',
        pathMatch: 'full'
    },
    {
        path: 'produto/cadastrar',
        component: CadastrarProdutoComponent,
    },
    {
        path: 'produto/consultar',
        component: ConsultarProdutoComponent,
    },
    {
        path: 'produto/editar/:id',
        component: EditarProdutoComponent
    },
    ... VendasRoutes,
    ... EntradaRoutes
];
