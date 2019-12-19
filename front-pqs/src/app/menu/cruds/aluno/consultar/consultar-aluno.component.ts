import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlunoService } from './../shared';
import { Response } from 'src/app/shared';
import { isString } from 'util';

@Component({
  selector: 'app-consultar-aluno',
  templateUrl: './consultar-aluno.component.html',
  styleUrls: ['./consultar-aluno.component.css']
})
export class ConsultarAlunoComponent implements OnInit {

    private lstAlunos: any[];

    private editarRota: string = '/menu/aluno/editar';
    private consultarResp: string[] = ['/menu/responsavel/consultar'];

    private vazio: boolean = false;
    private error: boolean = false;
    private msgError: string[];
    private success: boolean = false;
    private msgSuccess: string;

    constructor(
        private service: AlunoService,
        private router: Router
    ) { }

    ngOnInit() {
        let al = localStorage['success'];
        if ((isString(al)) && (al !== "")) {
            this.msgSuccess = al + " foi alterado com sucesso!";
            this.success = true;
            localStorage['success'] = "";
        }
        this.listar();
    }

    setEstado(codigo: number): void {
        this.service.desativar(codigo).subscribe(
            (response: Response) => {
                if (response.errors && response.errors.length > 0) {
                    this.error = true;
                    this.msgError = response.errors;
                    return;
                }

                this.lstAlunos.forEach(a => {
                    if (a.codigo === codigo) {
                        a.estado = !a.estado;
                        return;
                    }
                });

            }
        )
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

                this.lstAlunos = response.data;
            }
        )
    }

    editar(codigo: number) {
        this.router.navigate([this.editarRota, codigo]);
    }

    responsavelConsultar(): void {
        this.router.navigate(this.consultarResp);
    }

}
