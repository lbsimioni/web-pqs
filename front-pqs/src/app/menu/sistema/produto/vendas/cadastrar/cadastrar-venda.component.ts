import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { VendasService } from '../shared';
import { ProdutoService } from '../../shared';
import { ResponsavelService } from '../../../../cruds/responsavel/shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-venda',
  templateUrl: './cadastrar-venda.component.html',
  styleUrls: ['./cadastrar-venda.component.css']
})
export class CadastrarVendaComponent implements OnInit {

    form: FormGroup;

    private prod: any;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];
    private exists: boolean = false;
    private errorCpf: boolean = false;
    private lstErrorsCpf: string[] = [];
    private successCpf: boolean = false;

    constructor(
        private service: VendasService,
        private produtoService: ProdutoService,
        private respService: ResponsavelService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.pesquisarProd(id);
    }

    private initForm(): void {
        this.form = new FormGroup({
            'valorUnit': new FormControl(this.prod.valorVenda, [Validators.required]),
            'quantidade': new FormControl('1', [Validators.required]),
            'produto': new FormGroup({
                'codigo': new FormControl(this.prod.codigo, [Validators.required]),
                'nome': new FormControl(this.prod.nome, [Validators.required]),
                'valorVenda': new FormControl(this.prod.valorVenda, [Validators.required]),
            }),
            'responsavel': new FormGroup({
                'codigo': new FormControl('', [Validators.required]),
                'rg': new FormControl('', [Validators.required]),
                'cpf': new FormControl('', [Validators.required]),
                'nome': new FormControl('', [Validators.required])
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
        this.exists = true;
    }

    salvar(): void {

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

    pesquisarProd(id: any): void {
        this.produtoService.obter(id).subscribe((response: Response) => {
            if (response.errors && response.errors.length > 0) {
                this.lstErrors = response.errors;
                this.error = true;
                return;
            }

            this.prod = response.data;

            this.initForm();
        })
    }

    pesquisarResp(): void {
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
                let rep = response.data;
                this.form.patchValue({
                    'responsavel': {
                        'codigo': rep.codigo,
                        'rg': rep.rg,
                        'cpf': rep.cpf,
                        'nome': rep.nome
                    }
                });
            }
        )
    }

}
