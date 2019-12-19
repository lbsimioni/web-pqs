import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EntradaService } from '../shared';
import { ProdutoService } from '../../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-entrada',
  templateUrl: './cadastrar-entrada.component.html',
  styleUrls: ['./cadastrar-entrada.component.css']
})
export class CadastrarEntradaComponent implements OnInit {

    form: FormGroup;

    private prod: any;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];
    private exists: boolean = false;

    constructor(
        private service: EntradaService,
        private produtoService: ProdutoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = +this.route.snapshot.params['id'];
        this.pesquisarProd(id);
    }

    private initForm(): void {
        this.form = new FormGroup({
            'valorUnit': new FormControl(this.prod.custo, [Validators.required]),
            'quantidade': new FormControl('1', [Validators.required]),
            'produto': new FormGroup({
                'codigo': new FormControl(this.prod.codigo, [Validators.required]),
                'nome': new FormControl(this.prod.nome, [Validators.required]),
                'custo': new FormControl(this.prod.custo, [Validators.required]),
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

}
