import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProdutoService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.component.html',
  styleUrls: ['./editar-produto.component.css']
})
export class EditarProdutoComponent implements OnInit {

    private prod: any;
    private form: FormGroup;

    private exists: boolean = false;
    private error: boolean = false;
    private lstErrors: string[] = [];
    private success: boolean = false;
    private lstSuccess: string[] = [];

    private listarRota: string[] = ['/menu/produto/consultar'];

    constructor(
        private service: ProdutoService,
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
                this.prod = response.data;
                this.initForm();
                this.exists = true;
            }
        )
    }

    private initForm(): void {
        this.form = new FormGroup({
            'codigo': new FormControl(this.prod.codigo),
            'nome': new FormControl(this.prod.nome, [Validators.required]),
            'estoque': new FormControl(this.prod.estoque, [Validators.required]),
            'estoqueMinimo': new FormControl(this.prod.estoqueMinimo, [Validators.required]),
            'custo': new FormControl(this.prod.custo, [Validators.required]),
            'valorVenda': new FormControl(this.prod.valorVenda, [Validators.required])
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
