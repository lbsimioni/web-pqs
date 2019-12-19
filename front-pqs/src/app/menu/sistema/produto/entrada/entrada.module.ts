import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';

import { CadastrarEntradaComponent } from './cadastrar';
import { ConsultarEntradaComponent } from './consultar';
import { EntradaService } from './shared';
import { ProdutoService } from '../shared';


@NgModule({
  declarations: [
    CadastrarEntradaComponent, 
    ConsultarEntradaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    EntradaService,
    ProdutoService
  ]
})
export class EntradaModule { }
