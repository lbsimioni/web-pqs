import { Routes } from '@angular/router';

import { CadastrarVendaComponent } from './cadastrar';
import { ConsultarVendaComponent } from './consultar';

export const VendasRoutes: Routes = [

    {
        path: 'produto/vendas',
        redirectTo: 'produto/vendas/consultar',
        pathMatch: 'full'
    },
    {
        path: 'produto/vendas/cadastrar/:id',
        component: CadastrarVendaComponent,
    },
    {
        path: 'produto/vendas/consultar',
        component: ConsultarVendaComponent,
    },
];
