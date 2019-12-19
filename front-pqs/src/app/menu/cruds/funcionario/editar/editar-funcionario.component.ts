import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep'

import { FuncionarioService } from '../shared';
import { Response } from 'src/app/shared';
import { dateToString } from 'src/app/shared/parser';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {

    private func: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private contCep: boolean = true;
    private errorCep: boolean = false;

    private listarRota: string[] = ['/menu/funcionario/consultar'];

    constructor(
        private service: FuncionarioService,
        private router: Router,
        private route: ActivatedRoute,
        private viacep: NgxViacepService
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.service.obter(id).subscribe(
            ( response: Response ) => {
                if (response.errors && response.errors.length > 0) {
                    this.lstErrors = response.errors;
                    this.error = true;
                    return;
                }
                this.func = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.func.codigo),
            'nome': new FormControl(this.func.nome, [Validators.required]),
            'salario': new FormControl(this.func.salario, [Validators.required]),
            'profissao': new FormControl(this.func.profissao, [Validators.required]),
            'cargaHoraria': new FormControl(this.func.cargaHoraria, [Validators.required]),
            'rg': new FormControl(this.func.rg, [Validators.required]),
            'cpf': new FormControl(this.func.cpf, [Validators.required]),
            'dataNasc': new FormControl(dateToString(new Date(this.func.dataNasc)), [Validators.required]),
            'obs': new FormControl(this.func.obs, [Validators.required]),
            'username': new FormControl(this.func.username),
            'password': new FormControl(""),
            'endereco': new FormGroup({
                'codigo': new FormControl(this.func.endereco.codigo),
                'cep': new FormControl(this.func.endereco.cep, [Validators.required]),
                'logradouro': new FormControl(this.func.endereco.logradouro, [Validators.required]),
                'numero': new FormControl(this.func.endereco.numero, [Validators.required]),
                'bairro': new FormControl(this.func.endereco.bairro, [Validators.required]),
                'uf': new FormControl(this.func.endereco.uf, [Validators.required]),
                'cidade': new FormControl(this.func.endereco.cidade, [Validators.required]),
                'complemento': new FormControl(this.func.endereco.complemento)
            }),
            'contato': new FormGroup({
                'codigo': new FormControl(this.func.contato.codigo),
                'celular': new FormControl(this.func.contato.celular, [Validators.required]),
                'telefone': new FormControl(this.func.contato.telefone),
                'email': new FormControl(this.func.contato.email, [Validators.required, Validators.email]),
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


    validar(): void {
        if (this.errorCep) {
            this.errorCep = false;
        }

    }

    pesquisar(): void {
        let cep: string = this.form.value.endereco.cep.toString();
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

    salvar(): void {

        this.service.alterar(this.form.value).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.lstErrors = response.errors;
                    //to do -> tratar erro do jeito certo
                    return;
                }
                let user = JSON.parse(localStorage['usuario'])

                if (user.codigo == response.data.codigo) {
                    localStorage['usuario'] = JSON.stringify(response.data);
                }

                localStorage['success'] = this.form.value.nome;
                this.router.navigate(this.listarRota);
            }
        )
    }

}
