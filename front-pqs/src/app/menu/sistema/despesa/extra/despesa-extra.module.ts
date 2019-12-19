import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarDespesaExtraComponent } from './cadastrar';
import { EditarDespesaExtraComponent } from './editar';
import { ConsultarDespesaExtraComponent } from './consultar';
import { DespesaService } from '../shared';

@NgModule({
  declarations: [
    CadastrarDespesaExtraComponent,
    EditarDespesaExtraComponent,
    ConsultarDespesaExtraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    DespesaService
  ]
})
export class DespesaExtraModule { }
