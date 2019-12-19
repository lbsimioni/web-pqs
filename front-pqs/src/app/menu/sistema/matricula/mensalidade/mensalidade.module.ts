import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { ConsultarMensalidadeComponent } from './consultar';
import { MensalidadeService } from './shared';


@NgModule({
  declarations: [
    ConsultarMensalidadeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    MensalidadeService
  ]
})
export class MensalidadeModule { }
