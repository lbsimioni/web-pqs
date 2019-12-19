import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ResponsavelService } from '../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-responsavel',
  templateUrl: './consultar-responsavel.component.html',
  styleUrls: ['./consultar-responsavel.component.css']
})
export class ConsultarResponsavelComponent implements OnInit {

    private lstResponsavel: any[];
    private editarRota: string = '/menu/responsavel/editar'

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: ResponsavelService,
        private router: Router
    ) { }

    ngOnInit() {
        let resp = localStorage['success'];
        if ((isString(resp)) && (resp !== "")) {
            this.msgSuccess = resp + " foi alterado com sucesso!";
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
                this.lstResponsavel = response.data;
            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

}
