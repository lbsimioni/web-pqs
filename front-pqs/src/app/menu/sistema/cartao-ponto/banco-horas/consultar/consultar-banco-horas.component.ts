import { Component, OnInit } from '@angular/core';

import { CartaoPontoService } from '../../shared';
import { Response } from 'src/app/shared';

@Component({
  selector: 'app-consultar-banco-horas',
  templateUrl: './consultar-banco-horas.component.html',
  styleUrls: ['./consultar-banco-horas.component.css']
})
export class ConsultarBancoHorasComponent implements OnInit {

    private lstBancosHoras: any[];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];

    constructor(
        private service: CartaoPontoService
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

                this.lstBancosHoras = response.data;

            }
        )
    }

}
