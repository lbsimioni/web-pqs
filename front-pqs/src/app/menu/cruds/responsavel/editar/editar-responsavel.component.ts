import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgxViacepService, Endereco, ErroCep } from '@brunoc/ngx-viacep'

import { ResponsavelService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-editar-responsavel',
  templateUrl: './editar-responsavel.component.html',
  styleUrls: ['./editar-responsavel.component.css']
})
export class EditarResponsavelComponent implements OnInit {

    form: FormGroup;
    private resp: any;

    private listarRota: string[] = ['/menu/responsavel/consultar'];

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private contCep: boolean = true;
    private errorCep: boolean = false;

    constructor(
        private service: ResponsavelService,
        private router: Router,
        private route: ActivatedRoute,
        private viacep: NgxViacepService
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
                this.resp = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.resp.codigo),
            'nome': new FormControl(this.resp.nome, [Validators.required]),
            'rg': new FormControl(this.resp.rg, [Validators.required]),
            'cpf': new FormControl(this.resp.cpf, [Validators.required]),
            'endereco': new FormGroup({
                'codigo': new FormControl(this.resp.endereco.codigo),
                'cep': new FormControl(this.resp.endereco.cep, [Validators.required]),
                'logradouro': new FormControl(this.resp.endereco.logradouro, [Validators.required]),
                'numero': new FormControl(this.resp.endereco.numero, [Validators.required]),
                'bairro': new FormControl(this.resp.endereco.bairro, [Validators.required]),
                'uf': new FormControl(this.resp.endereco.uf, [Validators.required]),
                'cidade': new FormControl(this.resp.endereco.cidade, [Validators.required]),
                'complemento': new FormControl(this.resp.endereco.complemento)
            }),
            'contato': new FormGroup({
                'codigo': new FormControl(this.resp.contato.codigo),
                'celular': new FormControl(this.resp.contato.celular, [Validators.required]),
                'telefone': new FormControl(this.resp.contato.telefone),
                'email': new FormControl(this.resp.contato.email, [Validators.required, Validators.email]),
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
