import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep'

import { FuncionarioService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-funcionario',
  templateUrl: './cadastrar-funcionario.component.html',
  styleUrls: ['./cadastrar-funcionario.component.css']
})
export class CadastrarFuncionarioComponent implements OnInit {

    form: FormGroup;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private contCep: boolean = false;
    private errorCep: boolean = false;

    constructor(
        private service: FuncionarioService,
        private viacep: NgxViacepService 
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'nome': new FormControl('', [Validators.required]),
            'salario': new FormControl('', [Validators.required]),
            'profissao': new FormControl('', [Validators.required]),
            'cargaHoraria': new FormControl('', [Validators.required]),
            'rg': new FormControl('', [Validators.required]),
            'cpf': new FormControl('', [Validators.required]),
            'dataNasc': new FormControl('', [Validators.required]),
            'obs': new FormControl(''),
            'username': new FormControl(''),
            'password': new FormControl(''),
            'endereco': new FormGroup({
                'cep': new FormControl('', [Validators.required]),
                'logradouro': new FormControl('', [Validators.required]),
                'numero': new FormControl('', [Validators.required]),
                'bairro': new FormControl('', [Validators.required]),
                'uf': new FormControl('', [Validators.required]),
                'cidade': new FormControl('', [Validators.required]),
                'complemento': new FormControl('')
            }),
            'contato': new FormGroup({
                'celular': new FormControl('', [Validators.required]),
                'telefone': new FormControl(''),
                'email': new FormControl('', [Validators.required, Validators.email]),
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
                this.lstSuccess = ['Dados salvos com sucesso!'];
                this.initForm();
            }
        )
    }

    validar(): void {
        if (this.errorCep) {
            this.errorCep = false;
        }

    }

    pesquisar(): void {
        let cep: string = this.form.value.endereco.cep;
        let qtd = cep.length;
        if (qtd == 8) {
            this.viacep.buscarPorCep(cep).then(
                (endereco: Endereco) => {
                    this.contCep = true;
                    this.form.patchValue({
                        'endereco': {
                            'logradouro': endereco.logradouro,
                            'bairro': endereco.bairro,
                            'uf': endereco.uf,
                            'cidade': endereco.localidade,
                            'complemento': endereco.complemento
                        }
                    });
                }
            ).catch(
                (error: ErroCep) => {
                    this.errorCep = true;
                }
            )
        } else {
            this.errorCep = true;
        }

    }

}
