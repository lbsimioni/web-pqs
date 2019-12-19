import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';

import { CadastrarAlunoComponent } from './cadastrar';
import { ConsultarAlunoComponent } from './consultar';
import { AlunoService } from './shared';
import { ResponsavelService } from '../responsavel';
import { EditarAlunoComponent } from './editar';


@NgModule({
    declarations: [
        CadastrarAlunoComponent, 
        ConsultarAlunoComponent, 
        EditarAlunoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        CadastrarAlunoComponent,
        ConsultarAlunoComponent,
        EditarAlunoComponent
    ],
    providers: [
        AlunoService,
        ResponsavelService
    ]
})
export class AlunoModule { }
