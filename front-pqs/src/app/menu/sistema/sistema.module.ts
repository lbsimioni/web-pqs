import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaModule } from './despesa';
import { ReceitaModule } from './receita';
import { RendimentoModule } from './rendimento';
import { MatriculaModule } from './matricula';
import { ProdutoModule } from './produto';
import { CartaoPontoModule } from './cartao-ponto';

@NgModule({
  declarations: [
      
  ],
  imports: [
    CommonModule,
    DespesaModule,
    ReceitaModule,
    RendimentoModule,
    MatriculaModule,
    ProdutoModule,
    CartaoPontoModule
  ]
})
export class SistemaModule { }
