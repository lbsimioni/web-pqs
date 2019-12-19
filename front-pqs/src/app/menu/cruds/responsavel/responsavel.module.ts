import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';
import { NgxViacepModule } from '@brunoc/ngx-viacep';

import { CadastrarResponsavelComponent } from './cadastrar';
import { ConsultarResponsavelComponent } from './consultar';
import { EditarResponsavelComponent } from './editar';
import { ResponsavelService } from './shared';


@NgModule({
  declarations: [
      CadastrarResponsavelComponent,
      ConsultarResponsavelComponent,
      EditarResponsavelComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxViacepModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
      CadastrarResponsavelComponent,
      ConsultarResponsavelComponent,
      EditarResponsavelComponent
  ],
  providers: [
      ResponsavelService
  ]

})
export class ResponsavelModule { }
