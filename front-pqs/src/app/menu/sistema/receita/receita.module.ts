import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { ConsultarReceitaComponent } from './consultar';
import { ReceitaService } from './shared';
import { ReceitaExtraModule } from './extra';

@NgModule({
  declarations: [
    ConsultarReceitaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReceitaExtraModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    ReceitaService
  ]
})
export class ReceitaModule { }
