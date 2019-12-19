import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { FuncionarioModule } from './funcionario';
import { AlunoModule } from './aluno';
import { ResponsavelModule } from './responsavel';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FuncionarioModule,
    AlunoModule,
    ResponsavelModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
  ]
})
export class CrudsModule { }
