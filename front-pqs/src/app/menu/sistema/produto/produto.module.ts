import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';

import { CadastrarProdutoComponent } from './cadastrar';
import { ConsultarProdutoComponent } from './consultar';
import { EditarProdutoComponent } from './editar';
import { ProdutoService } from './shared';

import { VendasModule } from './vendas';
import { EntradaModule } from './entrada';


@NgModule({
  declarations: [
    CadastrarProdutoComponent, 
    ConsultarProdutoComponent, 
    EditarProdutoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    VendasModule,
    EntradaModule
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutoModule { }
