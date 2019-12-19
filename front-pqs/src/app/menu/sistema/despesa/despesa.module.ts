import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarDespesaComponent } from './cadastrar';
import { ConsultarDespesaComponent } from './consultar';
import { EditarDespesaComponent } from './editar';
import { DespesaService } from './shared';

import { DespesaExtraModule } from './extra';

@NgModule({
  declarations: [
    CadastrarDespesaComponent, 
    ConsultarDespesaComponent, 
    EditarDespesaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DespesaExtraModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    DespesaService
  ]
})
export class DespesaModule { }
