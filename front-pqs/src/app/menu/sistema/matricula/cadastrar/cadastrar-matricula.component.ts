import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { MatriculaService } from '../shared';
import { AlunoService } from '../../../cruds/aluno/shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-matricula',
  templateUrl: './cadastrar-matricula.component.html',
  styleUrls: ['./cadastrar-matricula.component.css']
})
export class CadastrarMatriculaComponent implements OnInit {

    form: FormGroup;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private alValid: boolean = false;

    constructor(
        private service: MatriculaService,
        private alunoService: AlunoService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'dataInic': new FormControl('', [Validators.required]),
            'dataFim': new FormControl('', [Validators.required]),
            'dataPagamento': new FormControl('', [Validators.required]),
            'valor': new FormControl('', [Validators.required]),
            'desconto': new FormControl('', [Validators.required]),
            'aluno': new FormGroup({
                'codigo': new FormControl(),
                'nome': new FormControl('', Validators.required),
                'responsavel': new FormGroup({
                    'nome': new FormControl(''),
                    'rg': new FormControl(''),
                    'cpf': new FormControl('')
                })
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

    private pesquisar(): void {
        this.alunoService.obterNomeCompleto(this.form.value.aluno.nome).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                this.error = false;
                this.alValid = true;

                this.form.patchValue({
                    'aluno': {
                        'codigo': response.data.codigo,
                        'responsavel': {
                            'nome': response.data.responsavel.nome,
                            'rg': response.data.responsavel.rg,
                            'cpf': response.data.responsavel.cpf,
                        }
                    }
                })
            }
        )
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
                this.alValid = false;
                this.lstSuccess = ['Dados salvos com sucesso!'];
                this.initForm();
            }
        )
    }

}
