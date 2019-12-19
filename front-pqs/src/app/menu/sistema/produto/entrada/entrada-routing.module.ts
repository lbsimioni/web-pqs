import { Routes } from '@angular/router';

import { CadastrarEntradaComponent } from './cadastrar';
import { ConsultarEntradaComponent } from './consultar';

export const EntradaRoutes: Routes = [

    {
        path: 'produto/entrada',
        redirectTo: 'produto/entrada/consultar',
        pathMatch: 'full'
    },
    {
        path: 'produto/entrada/cadastrar/:id',
        component: CadastrarEntradaComponent,
    },
    {
        path: 'produto/entrada/consultar',
        component: ConsultarEntradaComponent,
    },
];
