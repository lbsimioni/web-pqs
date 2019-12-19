import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProdutoService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.css']
})
export class CadastrarProdutoComponent implements OnInit {

    form: FormGroup;

    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    constructor(
        private service: ProdutoService
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            'nome': new FormControl('', [Validators.required]),
            'estoque': new FormControl('', [Validators.required]),
            'estoqueMinimo': new FormControl('', [Validators.required]),
            'custo': new FormControl('', [Validators.required]),
            'valorVenda': new FormControl('', [Validators.required])
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

}
