import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { LancarCartaoPontoComponent } from './lancar';
import { ConsultarCartaoPontoComponent } from './consultar';
import { EditarCartaoPontoComponent } from './editar';
import { CartaoPontoService } from './shared';

import { BancoHorasModule } from './banco-horas';


@NgModule({
  declarations: [
    LancarCartaoPontoComponent, 
    ConsultarCartaoPontoComponent, 
    EditarCartaoPontoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BancoHorasModule
  ],
  providers: [
    CartaoPontoService
  ]
})
export class CartaoPontoModule { }
