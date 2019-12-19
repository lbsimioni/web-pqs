import { Component, OnInit } from '@angular/core';

import { MensalidadeService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-consultar-mensalidade',
  templateUrl: './consultar-mensalidade.component.html',
  styleUrls: ['./consultar-mensalidade.component.css']
})
export class ConsultarMensalidadeComponent implements OnInit {

    private lstMensalidades: any[];

    private lstMes: string[][] = [['01', 'Janeiro'], ['02', 'Fevereiro'], ['03', 'Março'], ['04', 'Abril'], ['05', 'Maio'], ['06', 'Junho'],
    ['07', 'Julho'], ['08', 'Agosto'], ['09', 'Setembro'],
    ['10', 'Outubro'], ['11', 'Novembro'], ['12', 'Dezembro']];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: MensalidadeService
    ) { }

    ngOnInit() {
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

                this.lstMensalidades = response.data;

            }
        )
    }

    pagar(codigo: number) {
        this.service.pagar(codigo).subscribe(
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

                this.success = true;
                this.msgSuccess = "Mensalidade paga com sucesso!";

                this.listar();
            }
        )
    }

    mes(a: any) {
        for (let i: number = 0; i < this.lstMes.length; i++) {
            if (this.lstMes[i][0] === a) {
                return this.lstMes[i][1];
            }
        }
    }

}
