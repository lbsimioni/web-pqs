import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReceitaService } from '../../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-receita-extra',
  templateUrl: './consultar-receita-extra.component.html',
  styleUrls: ['./consultar-receita-extra.component.css']
})
export class ConsultarReceitaExtraComponent implements OnInit {

    private lstReceita: any[];

    private editarRota: string = '/menu/receita/extra/editar';

    private lstMes: string[][] = [['01', 'Janeiro'], ['02', 'Fevereiro'], ['03', 'Março'], ['04', 'Abril'], ['05', 'Maio'], ['06', 'Junho'],
    ['07', 'Julho'], ['08', 'Agosto'], ['09', 'Setembro'],
    ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro']];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: ReceitaService,
        private router: Router
    ) { }

    ngOnInit() {
        let receita = localStorage['success'];
        if ((isString(receita)) && (receita !== "")) {
            this.msgSuccess = receita + " foi alterado com sucesso!";
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
                this.lstReceita = response.data;

            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

    mes(a: any) {
        for (let i: number = 0; i < this.lstMes.length; i++) {
            if (this.lstMes[i][0] === a) {
                return this.lstMes[i][1];
            }
        }
    }

    nulo(x: any): boolean {
        return x <= 0;
    }

}
