import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarMatriculaComponent } from './cadastrar';
import { ConsultarMatriculaComponent } from './consultar';
import { EditarMatriculaComponent } from './editar';

import { MatriculaService } from './shared';
import { AlunoService } from '../../cruds/aluno/shared';

import { MensalidadeModule } from './mensalidade';

@NgModule({
  declarations: [
    CadastrarMatriculaComponent, 
    ConsultarMatriculaComponent, 
    EditarMatriculaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MensalidadeModule
  ],
  providers: [
    MatriculaService,
    AlunoService
  ]
})
export class MatriculaModule { }
