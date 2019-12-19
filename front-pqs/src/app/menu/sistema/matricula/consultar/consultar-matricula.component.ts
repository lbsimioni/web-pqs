import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatriculaService } from '../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-matricula',
  templateUrl: './consultar-matricula.component.html',
  styleUrls: ['./consultar-matricula.component.css']
})
export class ConsultarMatriculaComponent implements OnInit {

    private lstMatriculas: any[];

    private editarRota: string = '/menu/matricula/editar';

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: MatriculaService,
        private router: Router
    ) { }

    ngOnInit() {
        let matricula = localStorage['success'];
        if ((isString(matricula)) && (matricula !== "")) {
            this.msgSuccess = matricula + " foi alterado com sucesso!";
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

                this.lstMatriculas = response.data;

            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

}
