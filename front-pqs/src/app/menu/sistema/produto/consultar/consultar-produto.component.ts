import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProdutoService } from '../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-produto',
  templateUrl: './consultar-produto.component.html',
  styleUrls: ['./consultar-produto.component.css']
})
export class ConsultarProdutoComponent implements OnInit {

    private lstProdutos: any[];

    private editarRota: string = '/menu/produto/editar';
    private venderRota: string = '/menu/produto/vendas/cadastrar';
    private entradaRota: string = '/menu/produto/entrada/cadastrar';

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: ProdutoService,
        private router: Router
    ) { }

    ngOnInit() {
        let produto = localStorage['success'];
        if ((isString(produto)) && (produto !== "")) {
            this.msgSuccess = produto + " foi alterado com sucesso!";
            this.success = true;
            localStorage['success'] = "";
        }
        this.listar();
    }

    listar() {
        this.service.listar().subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.msgError = response.errors;
                    return;
                }

                if (response.data.length == 0) {
                    this.vazio = true;
                    return;
                }

                this.lstProdutos = response.data;

            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

    vender(codigo: number) {
        this.router.navigate([this.venderRota, codigo]);
    }

    entrada(codigo: number) {
        this.router.navigate([this.entradaRota, codigo]);
    }

}
