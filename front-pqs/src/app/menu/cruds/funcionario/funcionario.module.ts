import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxViacepModule } from '@brunoc/ngx-viacep';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarFuncionarioComponent } from './cadastrar';
import { ConsultarFuncionarioComponent } from './consultar';
import { FuncionarioService } from './shared';
import { EditarFuncionarioComponent } from './editar';


@NgModule({
  declarations: [
    CadastrarFuncionarioComponent,
    ConsultarFuncionarioComponent,
    EditarFuncionarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxViacepModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    CadastrarFuncionarioComponent,
    ConsultarFuncionarioComponent,
    EditarFuncionarioComponent
  ],
  providers: [
    FuncionarioService
  ]
})
export class FuncionarioModule { }
