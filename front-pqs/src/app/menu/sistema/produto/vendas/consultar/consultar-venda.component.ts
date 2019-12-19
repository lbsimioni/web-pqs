import { Component, OnInit } from '@angular/core';

import { VendasService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-consultar-venda',
  templateUrl: './consultar-venda.component.html',
  styleUrls: ['./consultar-venda.component.css']
})
export class ConsultarVendaComponent implements OnInit {

    private lstVendas: any[];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: VendasService
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

                this.lstVendas = response.data;

            }
        )
    }

}
