import { Component, OnInit } from '@angular/core';

import { EntradaService } from '../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-consultar-entrada',
  templateUrl: './consultar-entrada.component.html',
  styleUrls: ['./consultar-entrada.component.css']
})
export class ConsultarEntradaComponent implements OnInit {

    private lstEntradas: any[];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: EntradaService
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

                this.lstEntradas = response.data;

            }
        )
    }

}
