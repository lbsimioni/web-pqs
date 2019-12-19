import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartaoPontoService } from '../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-cartao-ponto',
  templateUrl: './consultar-cartao-ponto.component.html',
  styleUrls: ['./consultar-cartao-ponto.component.css']
})
export class ConsultarCartaoPontoComponent implements OnInit {

    private lstCP: any[];

    private editarRota: string = '/menu/cartao-ponto/editar';

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: CartaoPontoService,
        private router: Router
    ) { }

    ngOnInit() {
        let despesa = localStorage['success'];
        if ((isString(despesa)) && (despesa !== "")) {
            this.msgSuccess = despesa + " foi alterado com sucesso!";
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

                this.lstCP = response.data;
                console.log(this.lstCP);
            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

    nulo(x: any): boolean {
        return x <= 0;
    }

}
