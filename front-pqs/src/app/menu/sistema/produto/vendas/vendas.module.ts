import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMaskModule } from 'ngx-mask';

import { CadastrarVendaComponent } from './cadastrar';
import { ConsultarVendaComponent } from './consultar';
import { VendasService } from './shared';


@NgModule({
  declarations: [
    CadastrarVendaComponent, 
    ConsultarVendaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    VendasService
  ]
})
export class VendasModule { }
