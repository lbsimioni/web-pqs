import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarReceitaExtraComponent } from './cadastrar';
import { ConsultarReceitaExtraComponent } from './consultar';
import { EditarReceitaExtraComponent } from './editar';
import { ReceitaService } from '../shared';

@NgModule({
  declarations: [
    CadastrarReceitaExtraComponent,
    ConsultarReceitaExtraComponent,
    EditarReceitaExtraComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ReceitaService
  ]
})
export class ReceitaExtraModule { }
