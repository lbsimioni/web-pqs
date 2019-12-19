import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { ConsultarRendimentoComponent } from './consultar';
import { RendimentoService } from './shared';

@NgModule({
  declarations: [
    ConsultarRendimentoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    RendimentoService
  ]
})
export class RendimentoModule { }
