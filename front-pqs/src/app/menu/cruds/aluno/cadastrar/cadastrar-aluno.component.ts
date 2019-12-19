import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AlunoService } from '../shared';
import { Response } from 'src/app/shared';
import { ResponsavelService } from '../../responsavel';

@Component({
  selector: 'app-cadastrar-aluno',
  templateUrl: './cadastrar-aluno.component.html',
  styleUrls: ['./cadastrar-aluno.component.css']
})
export class CadastrarAlunoComponent implements OnInit {

    form: FormGroup;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private rep: any = '';
    private errorCpf: boolean = false;
    private lstErrorsCpf: string[] = [];
    private successCpf: boolean = false;

    constructor(
        private service: AlunoService,
        private respService: ResponsavelService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'nome': new FormControl('', [Validators.required]),
            'cargaHoraria': new FormControl('', [Validators.required]),
            'dataNasc': new FormControl('', [Validators.required]),
            'responsavel': new FormGroup({
                'codigo': new FormControl('', Validators.required),
                'rg': new FormControl('', Validators.required)
            })
        });
        this.form.valueChanges.subscribe(
            (value: any) => {
                if (this.success) this.success = false;
                if (this.error) this.error = false;
                if (this.lstErrors.length > 0) this.lstErrors = [];
                if (this.lstSuccess.length > 0) this.lstSuccess = [];
            }
        );
    }

    salvar(): void {
        /*if (this.form.hasError) {
            this.error = true;
            this.lstErrors = ['testando'];
            return
        }*/

        this.service.salvar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                this.error = false;
                this.success = true;
                this.successCpf = false;
                this.lstSuccess = ['Dados salvos com sucesso!'];
                this.initForm();
            }
        )
    }

    pesquisar(): void {
        this.respService.obterRg(this.form.value.responsavel.rg).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.successCpf = false;
                    this.errorCpf = true;
                    this.lstErrorsCpf = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                this.errorCpf = false;
                this.successCpf = true;
                this.rep = response.data;
                this.form.patchValue({'responsavel': {
                    'codigo': this.rep.codigo
                }});
            }
        )
    }

}
