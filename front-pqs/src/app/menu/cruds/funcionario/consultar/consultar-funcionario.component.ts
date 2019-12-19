import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FuncionarioService } from '../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-funcionario',
  templateUrl: './consultar-funcionario.component.html',
  styleUrls: ['./consultar-funcionario.component.css']
})
export class ConsultarFuncionarioComponent implements OnInit {

    private lstFuncionario: any[];

    private editarRota: string = '/menu/funcionario/editar';

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: FuncionarioService,
        private router: Router,
        ) { }

    ngOnInit() {
        let func = localStorage['success'];
        if ((isString(func)) && (func !== "")) {
            this.msgSuccess = func + " foi alterado com sucesso!";
            this.success = true;
            localStorage['success'] = "";
        }
        this.listar();
    }

    setEstado(codigo: number): void {
        this.service.desativar(codigo).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0){
                    this.error = true;
                    this.msgError = response.errors;
                    return;
                }

                this.lstFuncionario.forEach(func => {
                    if (func.codigo === codigo) {
                        func.estado = !func.estado;
                        return;
                    }
                });
                
            }
        )
    }

    listar(){
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
                
                this.lstFuncionario = response.data;
            }
        )
    }

    editar(codigo: number){
        this.router.navigate([this.editarRota, codigo]);
    }

}
