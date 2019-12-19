import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AlunoService } from '../shared';
import { Response } from 'src/app/shared';
import { ResponsavelService } from '../../responsavel';
import { dateToString } from 'src/app/shared/parser';

@Component({
  selector: 'app-editar-aluno',
  templateUrl: './editar-aluno.component.html',
  styleUrls: ['./editar-aluno.component.css']
})
export class EditarAlunoComponent implements OnInit {

    form: FormGroup;
    private aluno: any;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private errorCpf: boolean = false;
    private lstErrorsCpf: string[] = [];
    private successCpf: boolean = true;
    private exists: boolean = false;

    private listarRota: string[] = ['/menu/aluno/consultar'];

    constructor(
        private service: AlunoService,
        private respService: ResponsavelService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.service.obter(id).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.lstErrors = response.errors;
                    this.error = true;
                    return;
                }
                this.aluno = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.aluno.codigo, [Validators.required]),
            'nome': new FormControl(this.aluno.nome, [Validators.required]),
            'valorMensalidade': new FormControl(this.aluno.valorMensalidade, [Validators.required]),
            'cargaHoraria': new FormControl(this.aluno.cargaHoraria, [Validators.required]),
            'dataNasc': new FormControl(dateToString(new Date(this.aluno.dataNasc)), [Validators.required]),
            'responsavel': new FormGroup({
                'codigo': new FormControl(this.aluno.responsavel.codigo),
                'nome': new FormControl(this.aluno.responsavel.nome, [Validators.required]),
                'rg': new FormControl(this.aluno.responsavel.rg, [Validators.required]),
                'cpf': new FormControl(this.aluno.responsavel.cpf, [Validators.required]),
                'qtdAluno': new FormControl(this.aluno.responsavel.qtdAluno, [Validators.required]),
                'valorMes': new FormControl(this.aluno.responsavel.valorMes, [Validators.required])
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

                this.successCpf = true;
                let rep = response.data;
                this.form.patchValue({
                    'responsavel': {
                        'codigo': rep.codigo,
                        'nome': rep.nome,
                        'rg': rep.rg,
                        'cpf': rep.cpf,
                        'qtdAluno': rep.qtdAluno,
                        'valorMes': rep.valorMes
                    }
                });
            }
        )
    }

    salvar(): void {
        /*if (this.form.hasError) {
            this.error = true;
            this.lstErrors = ['testando'];
            return
        }*/

        this.service.alterar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                localStorage['success'] = this.form.value.nome;
                this.router.navigate(this.listarRota);
            }
        )
    }

}
