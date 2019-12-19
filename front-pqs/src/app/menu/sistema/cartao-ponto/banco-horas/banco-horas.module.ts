import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { ConsultarBancoHorasComponent } from './consultar';
import { CartaoPontoService } from '../shared';


@NgModule({
  declarations: [
    ConsultarBancoHorasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    CartaoPontoService
  ]
})
export class BancoHorasModule { }
